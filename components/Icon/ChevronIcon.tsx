import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type ChevronIconProps = {
  isOutline?: boolean;
  rotation?: string;
} & IconStyledProps;

const ChevronIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
  rotation = "right",
  onClick,
}: ChevronIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
      onClick={onClick}
    >
      <ReactSVG
        src={`${ICON_PATH}/chevron-${rotation}${
          isOutline ? "-outline" : ""
        }.svg`}
      />
    </BaseIcon>
  );
};

export default ChevronIcon;
