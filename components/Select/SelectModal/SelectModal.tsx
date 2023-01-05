import React, { useContext } from "react";
import BaseModal from "../../Modal/BaseModal/BaseModal";
import { ThemeContext } from "styled-components";

export type SelectModalProps = {
  isOpen: boolean;
  children: JSX.Element;
  position?: string;
  color?: string;
  padding?: string;
  width?: string;
  onClose?: () => void;
};

const SelectModal = ({
  isOpen,
  children,
  position,
  color,
  padding,
  width,
  onClose,
}: SelectModalProps) => {
  const themeContext = useContext(ThemeContext);

  const handleCloseSelectModal = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <BaseModal
        position={position}
        isOverlay={false}
        isOpen={isOpen}
        hasClose={false}
        padding={padding}
        width={width}
        childrenColor={color || themeContext.blackColor}
        onClose={handleCloseSelectModal}
      >
        <>{children}</>
      </BaseModal>
    </>
  );
};

export default SelectModal;
