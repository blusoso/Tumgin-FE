import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";

import GoogleSignIn from "@/components/SignIn/Google";
import { FORM_TYPE } from "@/components/SignIn/SignInSignUpForm";
import FacebookSignIn from "@/components/SignIn/Facebook";
import AuthLayout from "@/components/Layout/AuthLayout";
import PolicyConsentCheckbox from "@/components/Checkbox/PolicyConsentCheckbox/PolicyConsentCheckbox";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { authState } from "@/recoils/index";
import createUser, { LOGIN_WITH, UserCreate } from "@/services/auth/createUser";
import getCurrentUser from "@/services/auth/getCurrentUser";
import login, {
  LoginData,
  LoginRequest,
  LoginResponse,
} from "@/services/auth/login";
import { ErrorResponse } from "@/services/type/globalServiceType";
import { STATUS_CODE } from "@/services/http/httpStatusCode";
import {
  clearToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/utils/cookies";
import axios from "axios";
import checkUserExist from "@/services/auth/checkUserExist";
import { ErrorMessageStyle } from "@/components/SignIn/SignInSignUpForm.styled";

type UserGoogleInfo = {
  sub: string;
  email: string;
  email_verified: boolean;
  given_name: string;
  name: string;
  picture: string;
  locale: string;
};

type NewSessionProps = {
  userDataCookie: any;
};

const GOOGLE_USER_INFO_API = "https://www.googleapis.com/oauth2/v3/userinfo";

const NewSession = ({ userDataCookie }: NewSessionProps) => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [isPolicyConsent, setIsPolicyConsent] = useState(true);
  const [isPolicyConsentError, setIsPolicyConsentError] = useState("");

  useEffect(() => {
    if (isPolicyConsent && isPolicyConsentError) {
      setIsPolicyConsentError("");
    }
  }, [isPolicyConsent]);

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

  const handleCredentialResponse = async (accessToken: any) => {
    if (isPolicyConsent) {
      setIsPolicyConsentError("");

      const userInfoResponse = await axios.get(GOOGLE_USER_INFO_API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userInfo: UserGoogleInfo = userInfoResponse.data;

      const userExitedResponse = await checkUserExist({
        email: userInfo.email,
      });
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
    } else {
      setIsPolicyConsentError(
        "กรุณายอมรับเงื่อนไขและนโยบายความเป็นส่วนตัวเพื่อใช้บริการบนเว็บไซต์"
      );
    }
  };

  const handlePolicyConsent = (checked: boolean) => {
    setIsPolicyConsent(checked);
  };

  const authLayoutProps = {
    title: "Tumgin",
    subTitle: "ยินดีต้อนรับ ใส่อีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ",
    formType: FORM_TYPE.SIGN_IN,
    submitButtonText: "เข้าสู่ระบบ",
  };

  return (
    <>
      <AuthLayout {...authLayoutProps}>
        <>
          <div className="my-5 text-secondary relative">
            <p className="bg-white inline-block whitespace-no-wrap relative z-10 px-2">
              หรือเข้าสู่ระบบ/ลงทะเบียนด้วย
            </p>
            <hr className="absolute top-1/2 border-1 w-full" />
          </div>

          <div className="my-5">
            <div className="mb-3">
              <PolicyConsentCheckbox
                id="policy-consent__login"
                checked={isPolicyConsent}
                onChange={handlePolicyConsent}
              />
              {isPolicyConsentError && (
                <ErrorMessageStyle>{isPolicyConsentError}</ErrorMessageStyle>
              )}
            </div>
            <div className="mb-3">
              <GoogleSignIn
                buttonText="Sign in with Google"
                onResponse={handleCredentialResponse}
              />
            </div>
            {/* <FacebookSignIn buttonText="Facebook" onResponse={handleToken} /> */}
          </div>

          <div>
            <span>
              ลงทะเบียนด้วยอีเมล?{" "}
              <Link href="/session/new/sign-up" className="link--underline">
                สมัครที่นี่
              </Link>
            </span>
          </div>
        </>
      </AuthLayout>
    </>
  );
};

export default NewSession;

export const getServerSideProps = ({ req, res }: any) => {
  const userDataCookie: any = getCookie("userData", { req, res });

  return {
    props: {
      userDataCookie: userDataCookie ? JSON.parse(userDataCookie) : "",
    },
  };
};
