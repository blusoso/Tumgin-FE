import React from "react";
import { ReactSVG } from "react-svg";
import { ICON_PATH } from "../../utils/constant";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";

type MenuIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const MenuIcon = ({
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: MenuIconProps) => {
  return (
    <BaseIcon iconWidth={iconWidth} iconHeight={iconHeight} color={color}>
      <ReactSVG src={`${ICON_PATH}/grid-outline.svg`} />
    </BaseIcon>
  );
};

export default MenuIcon;
