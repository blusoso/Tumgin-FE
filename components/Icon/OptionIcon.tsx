import React from "react";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ReactSVG } from "react-svg";

type OptionIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const OptionIcon = ({
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: OptionIconProps) => {
  return (
    <BaseIcon iconWidth={iconWidth} iconHeight={iconHeight} color={color}>
      <ReactSVG src="/assets/icons/options-outline.svg" />
    </BaseIcon>
  );
};

export default OptionIcon;
