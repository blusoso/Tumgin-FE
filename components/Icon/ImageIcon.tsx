import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type ImageIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const ImageIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: ImageIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG src={`${ICON_PATH}/image${isOutline ? "-outline" : ""}.svg`} />
    </BaseIcon>
  );
};

export default ImageIcon;
