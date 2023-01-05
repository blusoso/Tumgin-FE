import React, { useState } from "react";
import styled from "styled-components";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

import Allergy from "@/components/Preference/Allergy/Allergy";
import ButtonFooter from "@/components/ButtonFooter/ButtonFooter";
import Button, { BUTTON_TYPE } from "@/components/Button/Button";
import { renderChevronIcon } from "@/components/CookingProcessLayout/CookingProcessLayout";
import PreferenceDiet from "@/components/Preference/PreferenceDiet/PreferenceDiet";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { AllergyFooter } from "@/components/Preference/Allergy/Allergy.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import { COOKIE_AGE, COOKIE_NAME } from "@/utils/cookies";
import { PATH_NAME } from "@/components/Layout/Layout";

const ButtonWrapper = styled(AllergyFooter)`
  bottom: 1.6rem;

  .button__icon--end {
    margin-top: -0.35rem;
  }
`;

const TOTAL_STEP = 2;
const LAST_STEP = TOTAL_STEP;

const Preference = () => {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isDone, setIsDone] = useState(false);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Allergy />;
      case LAST_STEP:
        return <PreferenceDiet />;
      default:
        break;
    }
  };

  const onBack = () => {
    setStep(step - 1);
  };

  const onNext = () => {
    if (step != LAST_STEP) {
      setStep(step + 1);
      setIsDone(false);
    } else if (step == LAST_STEP) {
      setIsDone(true);
      setCookie(COOKIE_NAME.SET_USER_PREFERENCE, true, {
        maxAge: COOKIE_AGE.SET_USER_PREFERENCE,
      });

      router.back();
    }
  };

  return (
    <div className={`h-screen -mb-8 ${isMobile || isTablet ? "" : "pt-5"}`}>
      <div className="text-center font-normal text-lg">อาหารที่เหมาะกับคุณ</div>

      <div className="my-4">
        <ProgressBar current={step} total={TOTAL_STEP} isDone={isDone} />
      </div>

      {renderStep()}

      {step === 1 ? (
        <ButtonWrapper className="container">
          <Button
            type={BUTTON_TYPE.PRIMARY}
            className="w-full"
            padding="0.9rem"
            fontSize="16px"
            iconEnd={renderChevronIcon("right")}
            onClick={onNext}
          >
            <span>ต่อไป</span>
          </Button>
        </ButtonWrapper>
      ) : (
        <ButtonFooter
          className="container"
          leftButtonLabel="ย้อนกลับ"
          leftButtonType={BUTTON_TYPE.SECONDARY}
          leftButtonIconStart={renderChevronIcon("left")}
          rightButtonLabel={step === LAST_STEP ? "เสร็จสิ้น" : "ต่อไป"}
          rightButtonIconEnd={renderChevronIcon("right")}
          width={isMobile || isTablet ? "100%" : "15%"}
          onLeftClick={onBack}
          onRightClick={onNext}
        />
      )}
    </div>
  );
};

export default Preference;
