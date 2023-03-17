import useFetchSubscription from "../auth0/useFetchSubscription"
import PriceTable from "../front-page/PriceTable";
import config from "../../Constant"
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import DemoVideo from "./DemoVideo";

const StreamApp = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently, logout } = useAuth0();
  const { isAuthenticated, isLoading, data: hasSubscription} = useFetchSubscription({
    url: config.STRIPE.CHECK_SUBSCRIPTION_ENDPOINT, 
    reload: "false"
  })

  const handleSubStandardPurchase = async () => {
    const accessToken = await getAccessTokenSilently()
    const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'authorization': `Bearer ${accessToken}`
        },
        body: `priceId=${config.STRIPE.PRICE_ID_STANDARD}`
    };
    fetch(config.STRIPE.CREATE_SESSION_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.redirect) {
            window.location.href = data.url;
          }
        })
        .catch(err => {
          console.info("error when payment redirect: " + err);
        });
    }

  if (isLoading) {
    return <div className="text-center"> Loading ...</div>;
  }
  
  if (!isAuthenticated) {
    return logout({ returnTo: window.location.origin })
  }

  if (hasSubscription === "err") {
    return <div class="justify-center"> Did you start subscription service ???? " </div>
  }

  console.log("hasSubscription is", hasSubscription) 
  return (
    isAuthenticated && (hasSubscription ? <main className="bg-gray-100 w-full">
                                            <section className="container m-auto py-4 md:py-20">
                                              <DemoVideo />
                                            </section>
                                          </main>
                                        : <PriceTable 
                                            handleStandard={async ()=> handleSubStandardPurchase()} 
                                            standardTitle="Order Now"
                                            handlePro={async ()=> handleSubStandardPurchase()}
                                            proTitle="Order Now"
                                          />)

  )
};

export default StreamApp;