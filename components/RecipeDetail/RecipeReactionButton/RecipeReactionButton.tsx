import BookmarkIcon from "@/components/Icon/BookmarkIcon";
import HeartIcon from "@/components/Icon/HeartIcon";
import ShareIcon from "@/components/Icon/ShareIcon";
import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { HeartIconWrapper, IconWrapper } from "./RecipeReactionButton.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";

const HEART_ICON_WIDTH = "2rem";
const ICON_WIDTH = "1.8rem";

export type RecipeReactionButtonProps = {
  isLiked: boolean;
};

const RecipeReactionButton = ({ isLiked }: RecipeReactionButtonProps) => {
  const themeContext = useContext(ThemeContext);
  const [isLikedActive, setIsLikedActive] = useState(isLiked);
  const isMobile = useDetectMobile();

  const heartIconColor = themeContext.redColor;

  const toggleLikeRecipe = () => {
    setIsLikedActive(!isLikedActive);
  };

  return (
    <>
      <IconWrapper isMobile={isMobile} onClick={() => console.log("xx")}>
        <ShareIcon iconWidth={ICON_WIDTH} />
      </IconWrapper>
      <IconWrapper isMobile={isMobile} onClick={() => console.log("xx")}>
        <BookmarkIcon iconWidth={ICON_WIDTH} />
      </IconWrapper>
      <IconWrapper isMobile={isMobile} hasBorder onClick={toggleLikeRecipe}>
        {isLikedActive ? (
          <HeartIcon
            color={heartIconColor}
            isOutline={false}
            iconWidth={HEART_ICON_WIDTH}
          />
        ) : (
          <HeartIcon color={heartIconColor} iconWidth={HEART_ICON_WIDTH} />
        )}
      </IconWrapper>
    </>
  );
};

export default RecipeReactionButton;
