import React from "react";
import SignInSignUpForm, { FORM_TYPE } from "../SignIn/SignInSignUpForm";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";

type AuthLayoutProps = {
  title: string;
  subTitle?: string;
  formType: FORM_TYPE;
  children: JSX.Element;
  submitButtonText: string;
};

const AuthLayout = ({
  title,
  subTitle,
  formType,
  children,
  submitButtonText,
}: AuthLayoutProps) => {
  const isMobile = useDetectMobile();

  return (
    <div
      className={`text-center fixed inset-0 flex items-center -mt-16  ${
        isMobile ? "" : "px-96"
      }`}
    >
      <div className="container">
        <div className="my-4">
          <h1>{title}</h1>
          <p className="text-secondary mt-1">{subTitle}</p>
        </div>

        <SignInSignUpForm type={formType} submitButtonText={submitButtonText} />

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
