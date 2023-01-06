import React from "react";
import Button, { BUTTON_TYPE } from "../Button/Button";
import {
  ButtonFooterSection,
  ButtonFooterWrapper,
} from "./ButtonFooter.styled";

type ButtonFooterProps = {
  type?: BUTTON_TYPE;
  isFixed?: boolean;
  className?: string;
  leftButtonType?: BUTTON_TYPE;
  rightButtonType?: BUTTON_TYPE;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  width?: string;
  padding?: string;
  fontSize?: string;
  leftButtonLabel?: string;
  rightButtonLabel?: string;
  leftButtonIconStart?: React.ReactNode;
  leftButtonIconEnd?: React.ReactNode;
  rightButtonIconStart?: React.ReactNode;
  rightButtonIconEnd?: React.ReactNode;
  children?: JSX.Element | string;
  onClick?: () => void;
  onLeftClick?: () => void;
  onRightClick?: () => void;
};

const ButtonFooter = ({
  type = BUTTON_TYPE.PRIMARY,
  isFixed = true,
  className = "",
  leftButtonType = BUTTON_TYPE.PRIMARY,
  rightButtonType = BUTTON_TYPE.PRIMARY,
  iconStart = "",
  iconEnd = "",
  width = "100%",
  padding = "0.55rem 2rem 0.75rem 2rem",
  fontSize = "16px",
  leftButtonLabel = "",
  rightButtonLabel = "",
  leftButtonIconStart,
  leftButtonIconEnd,
  rightButtonIconStart,
  rightButtonIconEnd,
  children,
  onClick,
  onLeftClick,
  onRightClick,
}: ButtonFooterProps) => {
  const hasTwoButton = !!(leftButtonLabel && rightButtonLabel);

  return (
    <>
      <ButtonFooterSection className={className} isFixed={isFixed}>
        <ButtonFooterWrapper hasTwoButton={hasTwoButton} isFixed={isFixed}>
          <Button
            type={leftButtonType || type}
            icon={iconStart || leftButtonIconStart}
            iconEnd={iconEnd || leftButtonIconEnd}
            width={width}
            padding={padding}
            fontSize={fontSize}
            onClick={onLeftClick || onClick}
          >
            <div className="mt-1">{leftButtonLabel || children}</div>
          </Button>
          {hasTwoButton && (
            <Button
              type={rightButtonType || type}
              icon={rightButtonIconStart}
              iconEnd={rightButtonIconEnd}
              width={width}
              padding={padding}
              fontSize={fontSize}
              onClick={onRightClick}
            >
              <div className="mt-1">{rightButtonLabel}</div>
            </Button>
          )}
        </ButtonFooterWrapper>
      </ButtonFooterSection>
    </>
  );
};

export default ButtonFooter;
