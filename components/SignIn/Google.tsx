import React, { useEffect } from "react";
import styled from "styled-components";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { LOGIN_WITH } from "@/pages/session/new";
import { SOCIAL_LOGO_PATH } from "@/utils/constant";
import Image from "next/image";

type GoogleSignInProps = {
  buttonText: string;
  onResponse: (token: string, type: LOGIN_WITH) => void;
};

export const GoogleLoginStyle = styled.div`
  button {
    width: 100%;
    color: ${({ theme }) => theme.blackColor};
    font-family: "Mitr";
    border: 1px solid ${({ theme }) => theme.lightGrayColor};
    border-radius: ${({ theme }) => theme.borderRadiusSm};
    box-shadow: none;
    justify-content: center;

    div {
      padding: 5px;
      margin-right: 0.4rem;
    }

    span {
      font-weight: 400;
    }
  }
`;

export const GoogleLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.3rem;
  border: 1px solid ${({ theme }) => theme.lightGrayColor};
  border-radius: ${({ theme }) => theme.borderRadiusSm};
`;

const LOGO_SIZE = 24;

const GoogleSignIn = ({ buttonText, onResponse }: GoogleSignInProps) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  const handleCredentialResponse = async (response: any) => {
    console.log("response", response);
    const token = response.credential;

    onResponse(token, LOGIN_WITH.GOOGLE);
  };

  const handleFailResponse = () => {
    console.error("Login Failed");
  };

  useEffect(() => {
    // const { google } = window;
    // const { accounts } = google;
    // const { id } = accounts;
    // id.initialize({
    //   client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    //   callback: handleCredentialResponse,
    // });
    // const signInButton = document.getElementById("div__sign-in");
    // if (signInButton) {
    //   signInButton.innerHTML = buttonText;
    // }
    // if (signInButton) {
    //   (id as any).renderButton(signInButton, {
    //     theme: "outline",
    //     size: "medium",
    //   });
    // }
  }, []);

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: handleCredentialResponse,
    onError: handleFailResponse,
  });

  return (
    <>
      <GoogleLoginStyle>
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={handleFailResponse}
        />
        <GoogleLoginButton onClick={() => login()}>
          <Image
            src={`${SOCIAL_LOGO_PATH}/google.png`}
            alt="Google logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
          />
          Sign in with Google
        </GoogleLoginButton>
      </GoogleLoginStyle>

      {/* <div id="div__sign-in"></div> */}
    </>
  );
};

export default GoogleSignIn;
