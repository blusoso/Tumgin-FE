import React from "react";
import { ReactSVG } from "react-svg";
import BaseIcon from "./BaseIcon";
import { IconStyledProps } from "./Icon.styled";
import { ICON_PATH } from "../../utils/constant";

type ExternalLinkIconProps = {
  isOutline?: boolean;
} & IconStyledProps;

const ExternalLinkIcon = ({
  className = "",
  style,
  isOutline = true,
  iconWidth,
  iconHeight,
  color,
}: ExternalLinkIconProps) => {
  return (
    <BaseIcon
      className={className}
      style={style}
      iconWidth={iconWidth}
      iconHeight={iconHeight || iconWidth}
      color={color}
    >
      <ReactSVG
        src={`${ICON_PATH}/external-link${isOutline ? "-outline" : ""}.svg`}
      />
    </BaseIcon>
  );
};

export default ExternalLinkIcon;
