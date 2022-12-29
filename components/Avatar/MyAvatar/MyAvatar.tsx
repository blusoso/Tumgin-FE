import React from "react";
import { IMAGE_PATH } from "../../../utils/constant";

import BaseAvatar from "../BaseAvatar/BaseAvatar";
import PingNotification from "@/components/Notification/PingNotification";

type MyAvatarProps = {
  isNotification?: boolean;
};

const MyAvatar = ({ isNotification = false }: MyAvatarProps) => {
  const myAvatarImg = `${IMAGE_PATH}/avatar.png`;

  return (
    <>
      <div className="relative">
        <BaseAvatar img={myAvatarImg} />
        {isNotification && (
          <div className="absolute top-0 right-0">
            <PingNotification />
          </div>
        )}
      </div>
    </>
  );
};

export default MyAvatar;
