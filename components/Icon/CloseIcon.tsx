import React from "react";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ReactSVG } from "react-svg";

type CloseIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const CloseIcon = ({
  className = "",
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
  onClick,
}: CloseIconProps) => {
  return (
    <BaseIcon
      className={className}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
      onClick={onClick}
    >
      <ReactSVG src={`/assets/icons/close${isOutline ? "-outline" : ""}.svg`} />
    </BaseIcon>
  );
};

export default CloseIcon;
