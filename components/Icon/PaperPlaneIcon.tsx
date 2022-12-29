import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type PaperPlaneIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const PaperPlaneIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: PaperPlaneIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG
        src={`${ICON_PATH}/paper-plane${isOutline ? "-outline" : ""}.svg`}
      />
    </BaseIcon>
  );
};

export default PaperPlaneIcon;
