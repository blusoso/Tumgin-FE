import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";

import { SOCIAL_LOGO_PATH } from "@/utils/constant";

import { GoogleLoginButton, GoogleLoginStyle } from "./Google.styled";

type GoogleSignInProps = {
  buttonText: string;
  onResponse: (token: string) => void;
};

const LOGO_SIZE = 24;

const GoogleSignIn = ({ buttonText, onResponse }: GoogleSignInProps) => {
  const handleCredentialResponse = async (response: any) => {
    const accessToken = response.access_token;
    onResponse(accessToken);
  };

  const handleFailResponse = () => {
    console.error("Login Failed");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleCredentialResponse,
    onError: handleFailResponse,
  });

  return (
    <>
      <GoogleLoginStyle>
        <GoogleLoginButton onClick={() => googleLogin()}>
          <Image
            src={`${SOCIAL_LOGO_PATH}/google.png`}
            alt="Google logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
          />
          {buttonText}
        </GoogleLoginButton>
      </GoogleLoginStyle>
    </>
  );
};

export default GoogleSignIn;
