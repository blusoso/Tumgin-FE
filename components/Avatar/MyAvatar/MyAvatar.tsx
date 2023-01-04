import React from "react";
import { IMAGE_PATH } from "../../../utils/constant";

import BaseAvatar from "../BaseAvatar/BaseAvatar";
import PingNotification from "@/components/Notification/PingNotification";

type MyAvatarProps = {
  img?: string;
  isNotification?: boolean;
  onClick?: () => void;
};

const MyAvatar = ({ img, isNotification = false, onClick }: MyAvatarProps) => {
  const myAvatarImg = `${IMAGE_PATH}/avatar.png`;

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <BaseAvatar img={img || myAvatarImg} />
      {isNotification && (
        <div className="absolute top-0 right-0">
          <PingNotification />
        </div>
      )}
    </div>
  );
};

export default MyAvatar;
