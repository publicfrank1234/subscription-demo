import React from "react";
import Header from "../components/front-page/Header";
import PriceTable from "../components/front-page/PriceTable";
import { useAuth0 } from "@auth0/auth0-react";

function FrontPage() {
  const {loginWithRedirect} = useAuth0()

  return (
    <div>
      <Header />

      <div id="priceDiv"> 
        <PriceTable 
          handleStandard={loginWithRedirect}
          handlePro={loginWithRedirect}  
          standardTitle="Login to Order"
          proTitle="Login to Order"
        />
      </div>

    </div>
  );
}

export default FrontPage;
