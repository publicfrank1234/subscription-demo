const dev = {
    AUTH0: {
        // Auth0
        DOMAIN: "dev-bitxjooel7ixfpk7.us.auth0.com",
        CILENTID: "HaBCV1EJo4yWGNp54cze06lZviTMNykT",
        REDIRECTURI: "http://localhost:3000/app",
        AUDIENCE_APP: "https://dev-bitxjooel7ixfpk7.us.auth0.com/api/v2/",
        JWK_SECRETE_URI: 'https://dev-bitxjooel7ixfpk7.us.auth0.com/.well-known/jwks.json', 
        JWK_ISSUER: 'https://dev-bitxjooel7ixfpk7.us.auth0.com/',
        JWK_AUDIENCE_STRIPE: 'http://localhost:4242'
    },
    STRIPE: {
        CREATE_SESSION_ENDPOINT: 'http://localhost:4242/create-checkout-session',
        CHECK_SUBSCRIPTION_ENDPOINT: 'http://localhost:4242/get_subscription',
        PORTAL_ENDPOINT: 'http://localhost:4242/customer-portal',
        PRICE_ID_STANDARD: "price_1Mmi9YE0g01CdnufVQn9AXcj", 
        PRICE_ID_PRO: "price_1Mmi9YE0g01CdnufVQn9AXcj"
    }
}

const config = dev

module.exports =  {
    config
}