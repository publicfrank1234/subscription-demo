import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/stream-app/Header"
import { Navigate } from 'react-router-dom'
import config from "../Constant"

const SubscriptionPage = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const fetchData = async () => {
    const accessToken = await getAccessTokenSilently()

    if (!accessToken) {
        console.log("cannot get accessToken")
        return
    }

    const response = await fetch(config.STRIPE.PORTAL_ENDPOINT, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data
  };

  const handleUpdateSubscription = async ()=>{
      const portalData = await fetchData() 
      console.log("portal is ", portalData)
      if (portalData.redirect) {
        window.location.href = portalData.url;
      }
  }


  if (isLoading) {
    return <div className="text-center">Loading ...</div>;
  }

  return (
    isAuthenticated ? ( <>
                          <Header/> 

                          <main className="bg-gray-100  w-full">
                            <section className="container mx-auto px-0 md:px-4 md:py-20 py-4">
                            <div className="bg-white mx-auto hover:bg-gray-800 hover:text-white shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
                              <div className="relative mt-8 flex flex-col items-center justify-center gap-10">
                                <div className="h-56 rounded-2xl overflow-hidden ">
                                    <img src={user.picture} className="object-cover w-full h-full"  alt={user.name} />
                                </div>
                                <div className="flex flex-col justify-center items-start gap-2 font-extralight">
                                      <h2>{user.name}</h2>
                                      <p>{user.email}</p>
                                </div>
                                <div className="pb-6 w-full px-4">
                                  <button 
                                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleUpdateSubscription}
                                  >
                                    Cancel Subscription
                                  </button>
                                </div>
                              </div>
                            </div>
                            </section>
                          </main>
                        </>
                     ) 
                    : <Navigate to="/" />
  )
};

export default SubscriptionPage;