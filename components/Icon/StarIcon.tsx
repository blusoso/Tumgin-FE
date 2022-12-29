import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type StarIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const StarIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: StarIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG src={`${ICON_PATH}/star${isOutline ? "-outline" : ""}.svg`} />
    </BaseIcon>
  );
};

export default StarIcon;
