import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { authState } from "@/recoils/index";
import { AUTH_MAX_AGE_SECONDS } from "@/utils/constant";

import GoogleSignIn from "@/components/SignIn/Google";
import SignInSignUpForm, {
  FORM_TYPE,
} from "@/components/SignIn/SignInSignUpForm";
import FacebookSignIn from "@/components/SignIn/Facebook";
import AuthLayout from "@/components/Layout/AuthLayout";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import {
  isAccessTokenExpired,
  refreshAccessToken,
} from "@/utils/api/makeProtectedRequest";

type NewSessionProps = {
  userDataCookie: any;
};

export enum LOGIN_WITH {
  FACEBOOK = "FACEBOOK",
  GOOGLE = "GOOGLE",
}

const NewSession = ({ userDataCookie }: NewSessionProps) => {
  console.log("isAccessTokenExpired", isAccessTokenExpired());

  //TODO: if has a userData cookie -> 1. 1st time, redirect to preference/tutorial 2.redirect to home page/
  const [auth, setAuth] = useRecoilState(authState);

  // useEffect(() => {
  //   if (userDataCookie) {
  //     setAuth({ ...auth, userData: userDataCookie });
  //   }
  // }, []);

  const handleToken = (token: string, type: LOGIN_WITH) => {
    //TODO: make sure the password not to store in a cookie, store just a session token
    // const userData = jwt.decode(token);
    // console.log("userData", userData);
    // setAuth({ ...auth, userData: userData });
    // // Set the token in a cookie
    // setCookie("userData", userData, {
    //   maxAge: AUTH_MAX_AGE_SECONDS,
    // });
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
              <GoogleSignIn buttonText="Google" onResponse={handleToken} />
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
