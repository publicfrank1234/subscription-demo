import { MenuIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const MobileDropDownMenu = () => {
const { logout } = useAuth0();
return (
    <div>
    <div className="dropdown relative">
      <MenuIcon className=" 
                dropdown-toggle
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tights
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg active:text-white
                transition
                duration-150
                ease-in-out
                flex
                items-center
                whitespace-nowrap h-10 md:hidden" 
        type="button"
        data-bs-toggle="dropdown"
        id="dropdownMenuButton1"
        aria-expanded="false"
        />
      <ul
      className="
        dropdown-menu
        min-w-max
        absolute
        hidden
        bg-white
        text-base
        z-50
        float-left
        py-2
        list-none
        text-left
        rounded-lg
        shadow-lg
        mt-1
        hidden
        m-0
        bg-clip-padding
        border-none
      "
      aria-labelledby="dropdownMenuButton1"
    >
      <li>
      <Link 
        to="/app" 
        className="
            dropdown-item
            text-sm
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
      >BigBunny</Link>
      </li>
      <li>
        <Link 
          to="/subscription"
          className="
            dropdown-item
            text-sm
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
          >Subscription</Link>
      </li>
      <li>
        <p 
          onClick={() => logout({ returnTo: window.location.origin })}
          className="
            dropdown-item
            text-sm
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
          >Logout</p>
      </li>
    </ul> 
    </div> 
    </div>
)}

export default MobileDropDownMenu