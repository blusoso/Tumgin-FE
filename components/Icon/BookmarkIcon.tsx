import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type BookmarkIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const BookmarkIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: BookmarkIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG
        src={`${ICON_PATH}/bookmark${isOutline ? "-outline" : ""}.svg`}
      />
    </BaseIcon>
  );
};

export default BookmarkIcon;
