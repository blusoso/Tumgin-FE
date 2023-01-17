import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type LinkIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const LinkIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: LinkIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG src={`${ICON_PATH}/link${isOutline ? "-outline" : ""}.svg`} />
    </BaseIcon>
  );
};

export default LinkIcon;
