import React, { useContext, useState } from "react";
import BaseModal from "../../Modal/BaseModal/BaseModal";
import { ThemeContext } from "styled-components";

export type SelectModalProps = {
  isOpen: boolean;
  children: JSX.Element;
  position?: string;
  color?: string;
  padding?: string;
};

const SelectModal = ({
  isOpen,
  children,
  position,
  color,
  padding,
}: SelectModalProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <BaseModal
        position={position}
        isOverlay={false}
        isOpen={isOpen}
        hasClose={false}
        padding={padding}
        childrenColor={color || themeContext.blackColor}
      >
        <>{children}</>
      </BaseModal>
    </>
  );
};

export default SelectModal;
