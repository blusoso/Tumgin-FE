import { LOGIN_WITH } from "@/pages/session/new";
import React, { useContext } from "react";
import FacebookLogin, { ReactFacebookLoginProps } from "react-facebook-login";
import { ThemeContext } from "styled-components";
declare var FB: any;

type FacebookSignInProps = {
  buttonText: string;
  onResponse: (token: string, type: LOGIN_WITH) => void;
};

const FacebookSignIn = ({ buttonText, onResponse }: FacebookSignInProps) => {
  const themeContext = useContext(ThemeContext);

  const responseFacebook = (data: any) => {
    const token = data.accessToken;
    onResponse(token, LOGIN_WITH.FACEBOOK);
  };

  const buttonStyle: React.CSSProperties = {
    textTransform: "capitalize",
    backgroundColor: "white",
    color: themeContext.blackColor,
    border: `1px solid ${themeContext.lightGrayColor}`,
    fontSize: "14px",
    padding: "0.6rem 1rem",
    borderRadius: "5px",
    fontWeight: 400,
    fontFamily: "Mitr",
    width: "100%",
  };

  const customOnClick = () => {
    FB.login(
      (response: any) => {
        console.log(response);
      },
      { auth_type: "login" }
    );
  };

  const props: ReactFacebookLoginProps = {
    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
    autoLoad: true,
    fields: "name,email,picture",
    buttonStyle: buttonStyle,
    onClick: responseFacebook,
    callback: responseFacebook,
    icon: "fa-facebook",
    textButton: buttonText,
  };

  const logout = () => {
    FB.getLoginStatus((response: any) => {
      if (response.status === "connected") {
        FB.logout((response: any) => {
          console.log(response);
        });
      } else {
        console.log("User is not logged in or has not authorized your app");
      }
    });
  };

  return (
    <>
      <FacebookLogin {...props} />
      {/* <button onClick={logout}>Logout</button> */}
    </>
  );
};

export default FacebookSignIn;
