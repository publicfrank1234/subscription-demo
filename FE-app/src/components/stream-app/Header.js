import React from "react";
import "../../index.css";
import LogoutButton from "../auth0/LogoutButton";
import { Link } from "react-router-dom";
import MobileDropDown from "./HeaderMobileDropdownMenu"


const Header = () => {

  return (
    <header className=" container flex justify-between h-20 mt-4 mb-4">
      <div className="container pl-0 ml-0 flex items-center h-20">
           <p className="lg:inline-flex lg:text-3xl text-2xl font-bold text-primary"> Subscription-Demo </p>
      </div>
      <div className=" flex items-center">
        <MobileDropDown />
        <div className=" hidden md:flex items-center space-x-3 lg:space-x-8">
            <Link className="nav-item" to="/app">BigBunny</Link>
            <Link className="nav-item" to="/subscription">Subscription</Link>
          <div className="secondary-button"><LogoutButton text="Logout"/></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
