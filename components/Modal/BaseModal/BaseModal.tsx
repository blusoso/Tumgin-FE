import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "styled-components";

import {
  CloseButton,
  ModalContent,
  ModalOverlay,
  Description,
} from "./BaseModal.styled";
import CloseIcon from "../../Icon/CloseIcon";
import Button, { BUTTON_TYPE } from "../../Button/Button";

export enum BUTTON_ALIGN {
  LEFT = "start",
  CENTER = "center",
  RIGHT = "end",
}

export enum ALIGN_ITEM {
  TOP = "start",
  CENTER = "center",
  BOTTOM = "end",
}

export type BaseModalProps = {
  position?: string;
  isOverlay?: boolean;
  isOpen?: boolean;
  hasClose: boolean;
  title?: string;
  children: JSX.Element;
  childrenColor?: string;
  hasBorder?: boolean;
  padding?: string;
  width?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  marginBottom?: string;
  alignItem?: ALIGN_ITEM;
  buttonPrimaryText?: string;
  buttonSecondaryText?: string;
  buttonAlign?: BUTTON_ALIGN;
  onClose?: () => void;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const BaseModal = ({
  position,
  isOverlay = true,
  isOpen = false,
  hasClose = true,
  title,
  children,
  childrenColor,
  hasBorder = false,
  padding,
  width,
  top,
  bottom,
  left,
  right,
  marginBottom,
  alignItem,
  buttonPrimaryText,
  buttonSecondaryText,
  buttonAlign = BUTTON_ALIGN.CENTER,
  onClose,
  onPrimaryClick,
  onSecondaryClick,
}: BaseModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       if (onClose) onClose();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [modalRef]);

  const handleCloseModal = () => {
    if (onClose) onClose();
  };

  const renderPrimaryButton = buttonPrimaryText && (
    <Button
      type={BUTTON_TYPE.PRIMARY}
      padding="0.8rem 1.5rem"
      onClick={onPrimaryClick}
    >
      <>{buttonPrimaryText}</>
    </Button>
  );

  const renderSecondaryButton = buttonSecondaryText && (
    <Button
      type={BUTTON_TYPE.PRIMARY_OUTLINE}
      padding="0.8rem 1.5rem"
      onClick={onSecondaryClick}
    >
      <>{buttonSecondaryText}</>
    </Button>
  );

  return (
    <>
      {isOpen && (
        <ModalOverlay
          isOverlay={isOverlay}
          position={position}
          alignItem={alignItem}
          top={top}
          bottom={bottom}
          left={left}
          right={right}
        >
          <ModalContent
            ref={modalRef}
            hasBorder={hasBorder}
            padding={padding}
            width={width}
            marginBottom={marginBottom}
          >
            {hasClose && (
              <CloseButton onClick={handleCloseModal}>
                <CloseIcon />
              </CloseButton>
            )}

            <h3 className="pr-5 mb-1">{title}</h3>
            <Description color={childrenColor}>{children}</Description>
            {(buttonPrimaryText || buttonSecondaryText) && (
              <div className={`flex gap-3 mt-3 justify-${buttonAlign}`}>
                {renderSecondaryButton}
                {renderPrimaryButton}
              </div>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default BaseModal;
