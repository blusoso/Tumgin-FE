import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type BulbIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const BulbIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: BulbIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG src={`${ICON_PATH}/bulb${isOutline ? "-outline" : ""}.svg`} />
    </BaseIcon>
  );
};

export default BulbIcon;
