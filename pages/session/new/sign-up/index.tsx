import AuthLayout from "@/components/Layout/AuthLayout";
import SignInSignUpForm, {
  FORM_TYPE,
} from "@/components/SignIn/SignInSignUpForm";
import { APP_NAME } from "@/utils/constant";
import React from "react";

const SignUp = () => {
  const authLayoutProps = {
    title: APP_NAME,
    subTitle: "ยินดีต้อนรับ กรุณากรอกข้อมูลให้ครบถ้วน",
    formType: FORM_TYPE.SIGN_UP,
    submitButtonText: "ลงทะเบียน",
  };

  return (
    <>
      <AuthLayout {...authLayoutProps}>
        <></>
      </AuthLayout>
    </>
  );
};

export default SignUp;
