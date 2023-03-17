import React from "react"
import "../../index.css";
import LoginButton from "../auth0/LoginButton";

const Header = props => {

  return (
    <header className=" container flex justify-space h-20 mt-4 mb-4">
       <div className=" container flex pl-0 justify-start items-center h-20">
         <p className="lg:inline-flex lg:text-3xl text-2xl font-bold text-primary"> Subscription-Demo </p>
        </div>
        <div className="flex items-center">
          <div className="md:flex items-center space-x-3 lg:space-x-8">
              <div className="secondary-button md:primary-button"><LoginButton text="Sign In"/></div>
          </div>
        </div>
    </header>
  );
}

export default Header;
