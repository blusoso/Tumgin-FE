import React, { useEffect } from "react";
import styled from "styled-components";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt from "jsonwebtoken";

import { SOCIAL_LOGO_PATH } from "@/utils/constant";
import Image from "next/image";
import axios from "axios";
import createUser, {
  CreateUserRequest,
  LOGIN_WITH,
  UserCreate,
} from "@/services/auth/createUser";
import checkUserExist, {
  USER_EXITED_MESSAGE,
} from "@/services/auth/checkUserExist";
import { STATUS } from "@/services/type/globalServiceType";
import { useRouter } from "next/router";
import login, { LoginRequest, LoginResponse } from "@/services/auth/login";
import {
  clearToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/utils/cookies";
import { useRecoilState } from "recoil";
import { authState } from "@/recoils/index";
import getCurrentUser from "@/services/auth/getCurrentUser";

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
  font-weight: 400;
`;

type UserGoogleInfo = {
  sub: string;
  email: string;
  email_verified: boolean;
  given_name: string;
  name: string;
  picture: string;
  locale: string;
};

const LOGO_SIZE = 24;
const GOOGLE_USER_INFO_API = "https://www.googleapis.com/oauth2/v3/userinfo";

const GoogleSignIn = ({ buttonText, onResponse }: GoogleSignInProps) => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);

  const storeGoogleUser = async (user: UserGoogleInfo) => {
    const request: UserCreate = {
      username: user.name,
      email: user.email,
      profile_img: user.picture,
      login_with: LOGIN_WITH.GOOGLE,
      is_consent: true,
    };

    const createUserResponse = await createUser(request);

    return createUserResponse;
  };

  const fetchCurrentUser = async () => {
    const currentUserResponse = await getCurrentUser();
    if (currentUserResponse) {
      setAuth({ ...auth, user: currentUserResponse });
    }
  };

  const signIn = async (data: LoginRequest) => {
    const signInResponse = await login(data);

    if (signInResponse) {
      clearToken();
      setAccessTokenCookie(signInResponse.access_token);
      setRefreshTokenCookie(signInResponse.refresh_token);
      await fetchCurrentUser();
    }
  };

  const handleCredentialResponse = async (response: any) => {
    const accessToken = response.access_token;

    const userInfoResponse = await axios.get(GOOGLE_USER_INFO_API, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo: UserGoogleInfo = userInfoResponse.data;

    const userExitedResponse = await checkUserExist({ email: userInfo.email });
    const requestSignIn = {
      email: userInfo.email,
      login_with: LOGIN_WITH.GOOGLE,
    };

    if (userExitedResponse && userExitedResponse.status === STATUS.ERROR) {
      switch (userExitedResponse.message) {
        case USER_EXITED_MESSAGE.NOT_EXIT:
          await storeGoogleUser(userInfo);
          await signIn(requestSignIn);
          router.push("/preference");
          break;
        case USER_EXITED_MESSAGE.EXITED:
        default:
          await signIn(requestSignIn);
          router.push("/");
          break;
      }
    }
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

  const googleLogin = useGoogleLogin({
    // flow: "auth-code",
    onSuccess: handleCredentialResponse,
    onError: handleFailResponse,
  });

  return (
    <>
      <GoogleLoginStyle>
        {/* <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={handleFailResponse}
        /> */}
        <GoogleLoginButton onClick={() => googleLogin()}>
          <Image
            src={`${SOCIAL_LOGO_PATH}/google.png`}
            alt="Google logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
          />
          {buttonText}
        </GoogleLoginButton>
        {/* <GoogleLoginButton onClick={() => login()}>
          <Image
            src={`${SOCIAL_LOGO_PATH}/google.png`}
            alt="Google logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
          />
          Sign in with Google
        </GoogleLoginButton> */}
      </GoogleLoginStyle>

      {/* <div id="div__sign-in"></div> */}
    </>
  );
};

export default GoogleSignIn;
