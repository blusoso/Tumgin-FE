import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type RadioIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const RadioIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: RadioIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG
        src={`${ICON_PATH}/radio-button-on${isOutline ? "-outline" : ""}.svg`}
      />
    </BaseIcon>
  );
};

export default RadioIcon;
