import React, { useEffect } from "react";
import "./LoginSuccessPopup.css";

const LoginSuccessPopup = ({ hidePopup }) => {
  useEffect(() => {
    // Hide the popup after 2 seconds
    const timeout = setTimeout(() => {
      hidePopup();
    }, 2000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [hidePopup]);

  return <div className="login-success-popup">You are logged in!</div>;
};

export default LoginSuccessPopup;
