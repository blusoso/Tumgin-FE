import { LOGIN_WITH } from "@/pages/session/new";
import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";

type GoogleSignInProps = {
  buttonText: string;
  onResponse: (token: string, type: LOGIN_WITH) => void;
};

export const GoogleLoginStyle = styled.div`
  button {
    width: 100% !important;
    color: ${({ theme }) => theme.blackColor} !important;
    font-family: "Mitr" !important;
    border: 1px solid ${({ theme }) => theme.lightGrayColor} !important;
    border-radius: ${({ theme }) => theme.borderRadiusSm} !important;
    box-shadow: none !important;
    justify-content: center !important;

    div {
      padding: 5px !important;
      margin-right: 0.4rem !important;
    }

    span {
      font-weight: 400 !important;
    }
  }
`;

const GoogleSignIn = ({ buttonText, onResponse }: GoogleSignInProps) => {
  const handleCredentialResponse = (data: any) => {
    const token = data.credential;
    onResponse(token, LOGIN_WITH.GOOGLE);
  };

  useEffect(() => {
    const { google } = window;
    const { accounts } = google;
    const { id } = accounts;

    id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      callback: handleCredentialResponse,
    });

    const signInButton = document.getElementById("div__sign-in");

    if (signInButton) {
      signInButton.innerHTML = buttonText;
    }

    if (signInButton) {
      (id as any).renderButton(signInButton, {
        theme: "outline",
        size: "medium",
      });
    }
  }, []);

  return (
    <>
      <GoogleLoginStyle>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
          buttonText="Sign in with Google"
          onSuccess={handleCredentialResponse}
          cookiePolicy={"single_host_origin"}
        />
      </GoogleLoginStyle>

      {/* <div id="div__sign-in"></div> */}
    </>
  );
};

export default GoogleSignIn;
