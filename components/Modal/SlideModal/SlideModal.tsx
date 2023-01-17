import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SlideModalContainer, SlideModalContent } from "./SlideModal.styled";
import { DimBackground } from "@/components/Hamburger/MenuSidebar/MenuSidebar.styled";
import { CloseButton } from "../BaseModal/BaseModal.styled";
import CloseIcon from "@/components/Icon/CloseIcon";

type SlideModalProps = {
  isOpen?: boolean;
  title?: React.ReactNode;
  children: JSX.Element;
  hasClose?: boolean;
  onClose?: () => void;
};

const ANIMATION_DURATION = 0.5;

const SlideModal = ({
  isOpen = true,
  title,
  children,
  hasClose = true,
  onClose,
}: SlideModalProps) => {
  const handleCloseModal = () => {
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SlideModalContainer
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{
              duration: ANIMATION_DURATION,
              rotateY: {
                delay: 0,
              },
            }}
          >
            <SlideModalContent>
              {hasClose && (
                <CloseButton onClick={handleCloseModal}>
                  <CloseIcon />
                </CloseButton>
              )}

              {title && <div className="pr-5 mb-2 text-center">{title}</div>}
              <div>{children}</div>
            </SlideModalContent>
          </SlideModalContainer>
          <DimBackground />
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideModal;
