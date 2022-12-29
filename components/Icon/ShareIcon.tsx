import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type ShareIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const ShareIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: ShareIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG src={`${ICON_PATH}/share${isOutline ? "-outline" : ""}.svg`} />
    </BaseIcon>
  );
};

export default ShareIcon;
