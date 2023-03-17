import {useState, useRef, useEffect} from "react"
import { useAuth0} from "@auth0/auth0-react";
import config from "../../Constant"

const useFetchSubscription = props  => {
    const {url, reload} = props
    const cache = useRef({});
    const [data, setData] = useState([]);
    const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();

    useEffect(() => {
        console.log("fetchSubScription ")
        if (!url) return;
        const fetchData = async () => {
            try {

                const accessToken = await getAccessTokenSilently({
                    audience: config.AUTH0.AUDIENCE_APP,
                    // scope: "read:current_user update:current_user_metadata"
                })

                if (!accessToken) {
                    console.log("cannot get accessToken")
                    return
                }
                if (cache.current[url] && reload !== false) {
                    const data = cache.current[url];
                    setData(data);
                } else {
                    const response = await fetch(url, {
                        headers: {
                            authorization: `Bearer ${accessToken}`
                        }
                    });
                    console.log("response is", response.status)
                    if (response.status === "401") return setData("err") 

                    const data = await response.json();
                    cache.current[url] = data; // set response in cache;
                    setData(data.length>0?true:false);
                }
            } catch (e) {
                console.debug("Something went wrong", e);
                return {data:"err"}
              }
            };

            // // if (accessToken) 
            fetchData();

    }, [url, getAccessTokenSilently, reload]);

    return { isAuthenticated, isLoading, user, data };
};

export default useFetchSubscription