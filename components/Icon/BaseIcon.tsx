import React from "react";
import { IconStyled, IconStyledProps } from "./Icon.styled";

export type BaseIconProps = {
  children: JSX.Element;
} & IconStyledProps;

const BaseIcon = ({
  className,
  style,
  iconWidth,
  iconHeight,
  color,
  children,
  onClick,
}: BaseIconProps) => {
  return (
    <IconStyled
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      color={color}
      onClick={onClick}
    >
      {children}
    </IconStyled>
  );
};

export default BaseIcon;
