import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import ChevronIcon from "../../Icon/ChevronIcon";
import { useRouter } from "next/router";

export type BaseNavbarProps = {
  left?: JSX.Element | string;
  center?: JSX.Element | string;
  right?: JSX.Element;
  isBack?: boolean;
  isNext?: boolean;
  onBack?: () => void;
  onNext?: () => void;
};

const BaseNavbar = ({
  left,
  center,
  right,
  isBack = false,
  isNext = false,
  onBack,
  onNext,
}: BaseNavbarProps) => {
  const themeContext = useContext(ThemeContext);
  const router = useRouter();

  const handleBack = () => {
    router.back();
    if (onBack) onBack();
  };

  const handleNext = () => {
    console.log("back");
    if (onNext) onNext();
  };

  return (
    <div className="grid grid-flow-col auto-cols-auto items-center">
      <div className="flex items-center">
        {(isBack || onBack) && (
          <ChevronIcon
            rotation="left"
            color={themeContext.grayColor}
            onClick={handleBack}
          />
        )}{" "}
        {left && left}
      </div>
      <div
        className={`flex justify-center items-center text-center ${
          isBack ? "-ml-6" : ""
        }`}
      >
        {center}
      </div>
      <div className="flex justify-end items-center">
        {(isNext || onNext) && (
          <ChevronIcon
            rotation="right"
            color={themeContext.grayColor}
            onClick={handleNext}
          />
        )}{" "}
        {right && right}
      </div>
    </div>
  );
};

export default BaseNavbar;
