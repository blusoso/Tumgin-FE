import React from "react";
import { BaseAvatarWrapper } from "./BaseAvatar.styled";
import { IMAGE_PATH } from "@/utils/constant";

export type BaseAvatarProps = {
  size?: string;
  img?: string;
  borderRadius?: string;
};

const DEFAULT_AVATAR_SIZE = "3.125rem";
const DEFAULT_AVATAR_BORDER_RADIUS = "1rem";
const DEFAULT_AVATAR_IMG = `${IMAGE_PATH}/default-avatar.jpg`;

const BaseAvatar = ({
  size = DEFAULT_AVATAR_SIZE,
  img,
  borderRadius = DEFAULT_AVATAR_BORDER_RADIUS,
}: BaseAvatarProps) => {
  return (
    <>
      <BaseAvatarWrapper
        size={size}
        img={img || DEFAULT_AVATAR_IMG}
        borderRadius={borderRadius}
      />
    </>
  );
};

export default BaseAvatar;
