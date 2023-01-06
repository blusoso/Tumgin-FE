import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { SelectBox } from "../Mixin/Mixin";
import Input, { ERROR_TYPE, INPUT_TYPE } from "../Input/Input";
import Button, { BUTTON_TYPE } from "../Button/Button";
import EyeIcon from "../Icon/EyeIcon";
import { ErrorMessageStyle } from "./SignInSignUpForm.styled";
import PolicyConsentCheckbox from "../Checkbox/PolicyConsentCheckbox/PolicyConsentCheckbox";
import createUser, { LOGIN_WITH } from "services/auth/createUser";
import login, {
  LoginData,
  LoginRequest,
  LoginResponse,
} from "services/auth/login";
import {
  clearToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/utils/cookies";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { authState } from "@/recoils/index";
import getCurrentUser from "@/services/auth/getCurrentUser";
import { ErrorResponse } from "@/services/type/globalServiceType";
import { STATUS_CODE } from "@/services/http/httpStatusCode";

type SignInSignUpDataFormType = {
  email: string;
  password: string;
  confirm_password?: string;
  username?: string;
  gender?: number;
  is_consent?: boolean;
};

type GenderType = {
  id: number;
  emoji: string;
  name: string;
};

export const GENDER_DATA: GenderType[] = [
  { id: 1, emoji: "👩", name: "หญิง" },
  { id: 2, emoji: "👨", name: "ชาย" },
  { id: 3, emoji: "🌈", name: "lgbtq+" },
];

export enum FORM_TYPE {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

type SignInSignUpFormProps = {
  type: FORM_TYPE;
  submitButtonText: string;
};

const PASSWORD_MIN_LENGTH: number = 8;

enum ERROR_MESSAGE {
  REQUIRED = "จำเป็นต้องกรอก",
  EMAIL_PATTERN = "กรุณากรอกอีเมลให้ถูกต้อง",
  GENDER_REQUIRED = "จำเป็นต้องเลือกเพศ",
  CONSENT_REQUIRE = "กรุณายอมรับเงื่อนไขและนโยบายความเป็นส่วนตัวเพื่อใช้บริการบนเว็บไซต์",
  PASSWORD_NOT_MATCH = "รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่",
  // @ts-ignore
  PASSWORDS_MIN_LENGTH = `กรอกรหัสผ่านอย่างน้อย ${String(
    PASSWORD_MIN_LENGTH
  )} ตัวอักษร`,
}

const SignInSignUpForm = ({
  type,
  submitButtonText,
}: SignInSignUpFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  }: any = useForm();
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState(GENDER_DATA[0]);
  const [isPolicyConsent, setIsPolicyConsent] = useState(true);
  const [errorMessage, setErrorMessage] = useState<any>({
    gender: "",
    isConsent: "",
  });
  const [errorResponseMessage, setErrorResponseMessage] = useState<string>("");

  const clearErrorResponseMessage = () => {
    setErrorResponseMessage("");
  };

  useEffect(() => {
    if (type === FORM_TYPE.SIGN_IN && errorResponseMessage) {
      clearErrorResponseMessage();
    }
  }, [watch("email"), watch("password")]);

  const handleGender = (gender: GenderType) => {
    setSelectedGender(gender);
  };

  const handlePolicyConsent = (checked: boolean) => {
    setIsPolicyConsent(checked);
  };

  const validateGender = () => {
    if (selectedGender) {
      setErrorMessage({
        ...errorMessage,
        gender: "",
      });

      return selectedGender.id;
    } else {
      setErrorMessage({
        ...errorMessage,
        gender: ERROR_MESSAGE.GENDER_REQUIRED,
      });

      return false;
    }
  };

  const validateConsent = () => {
    if (isPolicyConsent) {
      setErrorMessage({
        ...errorMessage,
        isConsent: "",
      });

      return isPolicyConsent;
    } else {
      setErrorMessage({
        ...errorMessage,
        isConsent: ERROR_MESSAGE.CONSENT_REQUIRE,
      });

      return false;
    }
  };

  const fetchCurrentUser = async () => {
    const response = await getCurrentUser();
    if (response) {
      setAuth({ ...auth, user: response });
    }
  };

  const getSignInResponse = (
    response: LoginResponse | ErrorResponse | undefined,
    nextRoute: string
  ) => {
    if (response) {
      switch (response.status) {
        case STATUS_CODE.UNAUTHORIZED:
          setErrorResponseMessage((response as ErrorResponse).detail);
          break;
        case STATUS_CODE.OK:
        default:
          router.push(nextRoute);
          break;
      }
    }
  };

  const signIn = async (loginRequest: LoginRequest) => {
    const response: LoginResponse | ErrorResponse | undefined = await login(
      loginRequest
    );

    if (response && response.status === STATUS_CODE.OK) {
      const data: LoginData = (response as LoginResponse).data;
      clearToken();
      setAccessTokenCookie(data.access_token);
      setRefreshTokenCookie(data.refresh_token);
      fetchCurrentUser();
    }

    return response;
  };

  const onSubmit = async (data: SignInSignUpDataFormType) => {
    let request: any = data;
    request.login_with = LOGIN_WITH.SITE;

    if (type === FORM_TYPE.SIGN_UP) {
      request.gender = validateGender();
      request.is_consent = validateConsent();

      if (request.gender && request.is_consent) {
        const response = await createUser(request);

        if (response) {
          const loginRequest = {
            email: data.email,
            password: data.password,
          };

          const signInResponse = await signIn(loginRequest);
          getSignInResponse(signInResponse, "/preference");
        }
      }
    } else if (type === FORM_TYPE.SIGN_IN) {
      if (request) {
        const signInResponse = await signIn(data);
        getSignInResponse(signInResponse, "/");
      }
    }
  };

  //TODO: remember me for 30 days
  //TODO: forgot password

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <div className="mb-3">
          <Input
            id="sign-in__email"
            type={INPUT_TYPE.EMAIL}
            placeholder="Email"
            name="email"
            register={register}
            autoFocus
            required
            pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
          />
          {errors.email?.type === ERROR_TYPE.REQUIRED && (
            <ErrorMessageStyle>{ERROR_MESSAGE.REQUIRED}</ErrorMessageStyle>
          )}
          {errors.email?.type === ERROR_TYPE.PATTERN && (
            <ErrorMessageStyle>{ERROR_MESSAGE.EMAIL_PATTERN}</ErrorMessageStyle>
          )}
        </div>

        {type === FORM_TYPE.SIGN_UP && (
          <div className="mb-3">
            <Input
              id="sign-in__username"
              type={INPUT_TYPE.TEXT}
              placeholder="Username"
              name="username"
              register={register}
              required
            />
            {errors.username && (
              <ErrorMessageStyle>{ERROR_MESSAGE.REQUIRED}</ErrorMessageStyle>
            )}
          </div>
        )}

        <div className="mb-3">
          <Input
            id="sign-in__password"
            type={isShowPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
            placeholder="Password"
            name="password"
            register={register}
            endIcon={<EyeIcon isOff={!isShowPassword} />}
            onEndIconClick={() => setIsShowPassword(!isShowPassword)}
            required
            minLength={8}
          />
          {errors.password?.type === ERROR_TYPE.REQUIRED && (
            <ErrorMessageStyle>{ERROR_MESSAGE.REQUIRED}</ErrorMessageStyle>
          )}
          {errors.password?.type === ERROR_TYPE.MIN_LENGTH && (
            <ErrorMessageStyle>
              {ERROR_MESSAGE.PASSWORDS_MIN_LENGTH}
            </ErrorMessageStyle>
          )}
        </div>

        {type === FORM_TYPE.SIGN_UP && (
          <div className="mb-3">
            <Input
              id="sign-in__password--confirm"
              type={
                isShowConfirmPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD
              }
              placeholder="Confirm Password"
              name="confirm_password"
              register={register}
              endIcon={<EyeIcon isOff={!isShowConfirmPassword} />}
              onEndIconClick={() =>
                setIsShowConfirmPassword(!isShowConfirmPassword)
              }
              required
              validate={(value) => value === watch("password")}
              minLength={8}
            />
            {errors.confirm_password?.type === ERROR_TYPE.REQUIRED && (
              <ErrorMessageStyle>{ERROR_MESSAGE.REQUIRED}</ErrorMessageStyle>
            )}
            {errors.confirm_password?.type === ERROR_TYPE.VALIDATE && (
              <ErrorMessageStyle>
                {ERROR_MESSAGE.PASSWORD_NOT_MATCH}
              </ErrorMessageStyle>
            )}
            {errors.confirm_password?.type === ERROR_TYPE.MIN_LENGTH && (
              <ErrorMessageStyle>
                {ERROR_MESSAGE.PASSWORDS_MIN_LENGTH}
              </ErrorMessageStyle>
            )}
          </div>
        )}

        {type === FORM_TYPE.SIGN_UP && (
          <div className="mb-3">
            <div className="grid gap-3 grid-cols-3">
              {GENDER_DATA.map((gender, key) => (
                <React.Fragment key={`gender__${gender.name}--${key}`}>
                  <SelectBox
                    isActive={gender === selectedGender}
                    onClick={() => handleGender(gender)}
                  >
                    {gender.emoji} {gender.name}
                  </SelectBox>
                </React.Fragment>
              ))}
            </div>

            {errorMessage.gender && (
              <ErrorMessageStyle>
                {ERROR_MESSAGE.GENDER_REQUIRED}
              </ErrorMessageStyle>
            )}
          </div>
        )}

        {type === FORM_TYPE.SIGN_UP && (
          <div className="mb-2">
            <PolicyConsentCheckbox
              name="is_consent"
              checked={isPolicyConsent}
              onChange={handlePolicyConsent}
            />

            {errorMessage.isConsent && (
              <ErrorMessageStyle>
                {ERROR_MESSAGE.CONSENT_REQUIRE}
              </ErrorMessageStyle>
            )}
          </div>
        )}

        {errorResponseMessage && (
          <ErrorMessageStyle>{errorResponseMessage}</ErrorMessageStyle>
        )}
      </div>

      <Button
        isSubmit
        type={BUTTON_TYPE.PRIMARY}
        padding="0.8rem 2rem"
        minWidth="100%"
      >
        <>{submitButtonText}</>
      </Button>
    </form>
  );
};

export default SignInSignUpForm;
