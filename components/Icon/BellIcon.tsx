import React from "react";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ReactSVG } from "react-svg";

type BellIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const BellIcon = ({
  className = "",
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
  onClick,
}: BellIconProps) => {
  return (
    <BaseIcon
      className={className}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
      onClick={onClick}
    >
      <ReactSVG src={`/assets/icons/bell${isOutline ? "-outline" : ""}.svg`} />
    </BaseIcon>
  );
};

export default BellIcon;
