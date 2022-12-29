import React from "react";
import { BaseAvatarWrapper } from "./BaseAvatar.styled";

export type BaseAvatarProps = {
  size?: string;
  img: string;
  borderRadius?: string;
};

const DEFAULT_AVATAR_SIZE = "3.125rem";
const DEFAULT_AVATAR_BORDER_RADIUS = "1rem";

const BaseAvatar = ({
  size = DEFAULT_AVATAR_SIZE,
  img,
  borderRadius = DEFAULT_AVATAR_BORDER_RADIUS,
}: BaseAvatarProps) => {
  return (
    <>
      <BaseAvatarWrapper size={size} img={img} borderRadius={borderRadius} />
    </>
  );
};

export default BaseAvatar;
