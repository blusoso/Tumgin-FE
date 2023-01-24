import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "styled-components";
import { AnimatePresence } from "framer-motion";

import { FacebookShareButton } from "react-share";
import FacebookIcon from "react-share/lib/FacebookIcon";
import TwitterShareButton from "react-share/lib/TwitterShareButton";
import TwitterIcon from "react-share/lib/TwitterIcon";
import LineShareButton from "react-share/lib/LineShareButton";
import LineIcon from "react-share/lib/LineIcon";
import FacebookMessengerShareButton from "react-share/lib/FacebookMessengerShareButton";
import FacebookMessengerIcon from "react-share/lib/FacebookMessengerIcon";
import PinterestShareButton from "react-share/lib/PinterestShareButton";
import PinterestIcon from "react-share/lib/PinterestIcon";

import useDetectMobile from "@/utils/detectDevice/useDetectMobile";

import { HeartIconWrapper, IconWrapper } from "./RecipeReactionButton.styled";
import SlideModal from "@/components/Modal/SlideModal/SlideModal";
import ExternalLinkIcon from "@/components/Icon/ExternalLinkIcon";
import CopyButton from "@/components/Button/CopyButton/CopyButton";
import BaseAlert from "@/components/Alert/BaseAlert";
import LinkIcon from "@/components/Icon/LinkIcon";
import BaseModal from "@/components/Modal/BaseModal/BaseModal";
import BookmarkIcon from "@/components/Icon/BookmarkIcon";
import HeartIcon from "@/components/Icon/HeartIcon";
import ShareIcon from "@/components/Icon/ShareIcon";

const HEART_ICON_WIDTH = "2rem";
const ICON_WIDTH = "1.8rem";

export type RecipeReactionButtonProps = {
  isLiked: boolean;
  isUserLoggedIn: boolean;
  sharedUrl: string;
  sharedTitle: string;
  onToggleLikeRecipe: () => void;
};

const ICON_SOCIAL_MEDIA_SIZE = 45;
const SHOW_COPY_ALERT_SECOND = 3;

const RecipeReactionButton = ({
  isLiked,
  isUserLoggedIn,
  sharedUrl,
  sharedTitle,
  onToggleLikeRecipe,
}: RecipeReactionButtonProps) => {
  const router = useRouter();

  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();

  const heartIconColor = themeContext.redColor;
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isOpenCopyAlert, setIsOpenCopyAlert] = useState(false);

  const toggleLikeRecipe = () => {
    if (isUserLoggedIn) {
      onToggleLikeRecipe();
    } else {
      router.push("/session/new");
    }
  };

  const handleCopyButton = () => {
    setIsOpenCopyAlert(true);
    setTimeout(() => setIsOpenCopyAlert(false), SHOW_COPY_ALERT_SECOND * 1000);
  };

  const SlideModalTitle = (
    <div className="flex items-center justify-center gap-2">
      <ExternalLinkIcon iconWidth="1.4rem" />
      <h2>แชร์เลย</h2>
    </div>
  );

  const shareModalContent = (
    <div className="flex gap-4 my-4 justify-center">
      <CopyButton onClickCopyButton={handleCopyButton} />
      <FacebookShareButton url={sharedUrl}>
        <FacebookIcon size={ICON_SOCIAL_MEDIA_SIZE} round />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={sharedUrl}
        title={sharedTitle}
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ""}
      >
        <FacebookMessengerIcon size={ICON_SOCIAL_MEDIA_SIZE} round />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={sharedUrl} title={sharedTitle}>
        <TwitterIcon size={ICON_SOCIAL_MEDIA_SIZE} round />
      </TwitterShareButton>
      <LineShareButton url={sharedUrl} title={sharedTitle}>
        <LineIcon size={ICON_SOCIAL_MEDIA_SIZE} round />
      </LineShareButton>
    </div>
  );

  return (
    <>
      <IconWrapper
        isMobile={isMobile}
        onClick={() => setIsShareModalOpen(true)}
      >
        <ExternalLinkIcon iconWidth={ICON_WIDTH} />
      </IconWrapper>
      {/* <IconWrapper isMobile={isMobile} onClick={() => console.log("xx")}>
        <BookmarkIcon iconWidth={ICON_WIDTH} />
      </IconWrapper> */}
      <IconWrapper isMobile={isMobile} hasBorder onClick={toggleLikeRecipe}>
        {isLiked ? (
          <HeartIcon
            color={heartIconColor}
            isOutline={false}
            iconWidth={HEART_ICON_WIDTH}
          />
        ) : (
          <HeartIcon color={heartIconColor} iconWidth={HEART_ICON_WIDTH} />
        )}
      </IconWrapper>

      {isMobile ? (
        <SlideModal
          isOpen={isShareModalOpen}
          title={SlideModalTitle}
          onClose={() => setIsShareModalOpen(false)}
        >
          {shareModalContent}
        </SlideModal>
      ) : (
        <BaseModal
          isOpen={isShareModalOpen}
          title={SlideModalTitle}
          onClose={() => setIsShareModalOpen(false)}
        >
          {shareModalContent}
        </BaseModal>
      )}

      <AnimatePresence>
        {isOpenCopyAlert && (
          <BaseAlert
            iconStart={<LinkIcon iconWidth="1.4rem" />}
            message="คัดลอกลิงก์แล้ว"
            width={!isMobile ? "50%" : ""}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RecipeReactionButton;
