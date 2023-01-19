import Link from "next/link";
import moment from "moment";
import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { useRouter } from "next/router";

import { RecipeData } from "@/services/recipe/getRecipe";
import BaseAvatar from "../Avatar/BaseAvatar/BaseAvatar";
import HeartIcon from "../Icon/HeartIcon";
import MoreHorizontalIcon from "../Icon/MoreHorizontalIcon";

import {
  CreatedAtLabel,
  IconContainer,
  RecipeImg,
  SubTitle,
} from "./RecipeCard.styled";
import { formatTime } from "@/utils/time";
import likeRecipe, { LikeRecipeRequest } from "@/services/recipe/likeRecipe";

export type Author = {
  img: string;
  name: string;
};

export type RecipeCardProps = {
  className?: string;
  imgHeight?: string;
  recipe: RecipeData;
  isLiked: boolean;
  auth: any;
  user: any;
  width?: string;
};

const MORE_HORIZONTAL_ICON_WIDTH = "1.4rem";
const HEART_ICON_WIDTH = "1.7rem";
export const DEFAULT_THUMBNAIL_IMG = "";

const RecipeCard = ({
  className,
  imgHeight,
  recipe,
  isLiked,
  auth,
  user,
  width,
}: RecipeCardProps) => {
  moment.locale();

  const router = useRouter();
  const themeContext = useContext(ThemeContext);
  const [isLikedActive, setIsLikedActive] = useState(isLiked);
  const recipeLink = `/recipe/${recipe.id}/${recipe.slug}`;

  const toggleLikeRecipe = async () => {
    if (auth && recipe) {
      const likeRecipeRequest: LikeRecipeRequest = {
        user_id: auth.id,
        recipe_id: recipe.id,
      };

      await likeRecipe(likeRecipeRequest);

      setIsLikedActive(!isLikedActive);
    } else {
      router.push("/session/new");
    }
  };

  return (
    <div className={className} style={{ width: width || "inherit" }}>
      <div className="flex gap-3 items-center">
        <BaseAvatar
          img={auth.profile_img || ""}
          size="36px"
          borderRadius={themeContext.borderRadiusSm}
        />
        <div>
          <h3>{auth.username}</h3>
          <CreatedAtLabel>{moment(recipe.created_at).fromNow()}</CreatedAtLabel>
        </div>
        <div className="ml-auto">
          <MoreHorizontalIcon
            color={themeContext.lightGrayColor}
            iconWidth={MORE_HORIZONTAL_ICON_WIDTH}
          />
        </div>
      </div>
      <div className="my-2 relative">
        <Link href={recipeLink}>
          <RecipeImg
            backgroundImage={recipe.thumbnail_img || DEFAULT_THUMBNAIL_IMG}
            imgHeight={imgHeight}
          />
        </Link>
        <div className="absolute top-0 right-0 m-2">
          <IconContainer isActive={isLikedActive} onClick={toggleLikeRecipe}>
            {isLikedActive ? (
              <HeartIcon
                isOutline={false}
                iconWidth={HEART_ICON_WIDTH}
                color="#fff"
              />
            ) : (
              <HeartIcon iconWidth={HEART_ICON_WIDTH} />
            )}
          </IconContainer>
        </div>
        {recipe.is_staff_pick && (
          <Link href={recipeLink}>
            <div className="absolute bottom-0 right-0 m-2">
              <IconContainer padding="0.2rem 0.4rem">🏆</IconContainer>
            </div>
          </Link>
        )}
      </div>
      <Link href={recipeLink}>
        <h3>{recipe.name}</h3>
        <SubTitle>
          {recipe.calory && `${recipe.calory} Kcal`}{" "}
          {recipe.minute &&
            `${recipe.calory && "|"} ${formatTime(recipe.minute)}`}{" "}
          | {recipe.serving} ที่
        </SubTitle>
      </Link>
    </div>
  );
};

export default RecipeCard;
