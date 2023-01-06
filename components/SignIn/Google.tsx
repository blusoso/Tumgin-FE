import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useRecoilState } from "recoil";

import { SOCIAL_LOGO_PATH } from "@/utils/constant";
import {
  clearToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/utils/cookies";
import { authState } from "@/recoils/index";

import createUser, { LOGIN_WITH, UserCreate } from "@/services/auth/createUser";
import checkUserExist from "@/services/auth/checkUserExist";
import { ErrorResponse } from "@/services/type/globalServiceType";
import getCurrentUser from "@/services/auth/getCurrentUser";
import { STATUS_CODE } from "@/services/http/httpStatusCode";
import login, {
  LoginData,
  LoginRequest,
  LoginResponse,
} from "@/services/auth/login";

import { GoogleLoginButton, GoogleLoginStyle } from "./Google.styled";

type GoogleSignInProps = {
  buttonText: string;
  onResponse: (token: string, type: LOGIN_WITH) => void;
};

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

  const signIn = async (loginRequest: LoginRequest) => {
    const signInResponse: LoginResponse | ErrorResponse | undefined =
      await login(loginRequest);

    if (signInResponse && signInResponse.status === STATUS_CODE.OK) {
      const data: LoginData = (signInResponse as LoginResponse).data;
      clearToken();
      setAccessTokenCookie(data.access_token);
      setRefreshTokenCookie(data.refresh_token);
      await fetchCurrentUser();
    }

    return signInResponse;
  };

  const signInAndGoNextRoute = async (
    requestSignIn: LoginRequest,
    route: string
  ) => {
    const signInResponseAfterStore = await signIn(requestSignIn);

    if (
      signInResponseAfterStore &&
      signInResponseAfterStore.status === STATUS_CODE.OK
    ) {
      router.push(route);
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

    if (
      userExitedResponse &&
      userExitedResponse.status === STATUS_CODE.UNAUTHORIZED
    ) {
      console.log("store and sign in");
      await storeGoogleUser(userInfo);
      await signInAndGoNextRoute(requestSignIn, "/preference");
    } else {
      await signInAndGoNextRoute(requestSignIn, "/");
    }
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
