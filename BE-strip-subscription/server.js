const express = require("express");
const app = express();
const path = require('path');
const { config } =require("./Constant")

// to validate the auth0 jwt 
var { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: config.AUTH0.JWK_SECRETE_URI
  }),
  //weird issue with jwt audience setting: https://github.com/auth0-blog/nodejs-jwt-authentication-sample/issues/30
  aud: config.AUTH0.JWK_AUDIENCE_STRIPE,
  issuer: config.AUTH0.JWK_ISSUER,
  algorithms: ['RS256']
});


app.use(function(req, res, next) {
  const allowedOrigins = ['localhost:3000'];
  const reqHost = req.get('origin')
  let allowedHost = '';

  allowedOrigins.forEach( (ao) =>{
    if (reqHost && reqHost.endsWith(ao)===true){
      allowedHost = reqHost;
    }
  })

  res.header("Access-Control-Allow-Origin",  allowedHost);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Accept, Content-Length, X-Requested-With');
  next();
});

// Copy the .env.example in the root into a .env file in this folder
const envFilePath = path.resolve(__dirname, './.env');
const env = require("dotenv").config({ path: envFilePath });
if (env.error) {
  throw new Error(`Unable to load the .env file from ${envFilePath}. Please copy .env.example to ${envFilePath}`);
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/checkout-single-subscription",
    version: "0.0.1",
    url: "https://github.com/stripe-samples/checkout-single-subscription"
  }
});

app.use(express.static(process.env.STATIC_DIR));
app.use(express.urlencoded())
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

// app.get("/", (req, res) => {
//   const filePath = path.resolve(process.env.STATIC_DIR + "/index.html");
//   res.sendFile(filePath);
// });

//https://stackoverflow.com/questions/47058955/how-to-add-prefix-to-all-node-express-routes
//https://expressjs.com/en/guide/using-middleware.html
const router = express.Router()
//router.use(() => {})
router.use(jwtCheck)

// Fetch the Checkout Session to display the JSON result on the success page
router.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

router.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const { priceId } = req.body;
  const stripeCustomerId = req.auth['http://localhost:4242/stripe_customer_id']
  const origin = req.get('origin')
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the form
  // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: stripeCustomerId,
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${origin}/app`,
      cancel_url: `${origin}/app`,
      subscription_data: {
        trial_period_days: 30,
      },
      // automatic_tax: { enabled: true }
    });

    // return res.redirect(303, session.url);
    return res.send({
      redirect: true, 
      url: session.url
    })
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      }
    });
  }
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    basicPrice: process.env.BASIC_PRICE_ID,
    proPrice: process.env.PRO_PRICE_ID,
  });
});

router.get('/customer-portal', async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  //const { sessionId } = req.body;
  //const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  // const returnUrl = process.env.DOMAIN;

  // jwtcheck middleware will decode user_metadata from auth0 header
  try {
    const stripeCustomerId = req.auth['http://localhost:4242/stripe_customer_id']
    const origin = req.get('origin')

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId, //checkoutSession.customer,
      return_url: `${origin}/app`,
    });

    // res.redirect(303, portalSession.url);
    return res.send({
      redirect: true, 
      url: portalSession.url
    })
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      }
    });
  }
});

// Webhook handler for asynchronous events.
router.post("/webhook", async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "checkout.session.completed") {
    console.log(`🔔  Payment received!`);
  }

  res.sendStatus(200);
});


// reference - get the subscription info from strip : https://community.auth0.com/t/building-a-membership-site-with-auth0-and-stripe/49115/3 
router.get('/get_subscription', (req, res) => {
  const stripeCustomerId = req.auth['http://localhost:4242/stripe_customer_id']
  console.log("get subscription request ", stripeCustomerId)
  let subscriptions = [];
  stripe.customers.retrieve(stripeCustomerId, {expand: ['subscriptions']}).then(function(result){
    //console.log(result.subscriptions.data)
    for (let subscription of result.subscriptions.data) {
      if (subscription["status"] === "active" || subscription["status"] === "trialing") subscriptions.push({"id" : subscription.id}); 
      // console.log(subscription["status"], subscription, subscription.id, subscriptions)
    }
    res.status(200)
    console.log("/get_subscription subscription res: ", subscriptions)
    return res.send(subscriptions)
  });
  res.status(400)
});


app.get('/health', (req, res) => {
	//console.log("health check")
	//res.json({status: "ok"})
	res.status(200).send('OK')
});

process.env.NODE_ENV == "PAY" ? app.use('/pay', router) : app.use('/', router)
app.listen(4242, () => console.log(`Node server listening at http://localhost:${4242}/`));

app.options("/*", function(req, res, next){
  const allowedOrigins = ['localhost:3000'];
  const reqHost = req.get('origin')
  let allowedHost = '';

  allowedOrigins.forEach( (ao) =>{
    if (reqHost && reqHost.endsWith(ao)===true){
      allowedHost = reqHost;
    }
  })

  res.header('Access-Control-Allow-Origin', allowedHost);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
})