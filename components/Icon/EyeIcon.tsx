import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type EyeIconProps = {
  isOutline?: boolean;
  isOff?: boolean;
} & IconStyledProps;

const EyeIcon = ({
  className = "",
  style,
  isOutline = true,
  isOff = false,
  iconWidth,
  iconHeight,
  color,
}: EyeIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG
        src={`${ICON_PATH}/eye${isOff ? "-off" : ""}${
          isOutline ? "-outline" : ""
        }.svg`}
      />
    </BaseIcon>
  );
};

export default EyeIcon;
