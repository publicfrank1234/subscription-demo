import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = props => {
  const { text } = props
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>{text}</button>;
};

export default LoginButton;