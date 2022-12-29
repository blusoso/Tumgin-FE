import Link from "next/link";
import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import BaseAvatar from "../Avatar/BaseAvatar/BaseAvatar";
import HeartIcon from "../Icon/HeartIcon";
import MoreHorizontalIcon from "../Icon/MoreHorizontalIcon";
import {
  CreatedAtLabel,
  IconContainer,
  RecipeImg,
  SubTitle,
} from "./RecipeCard.styled";

export type Author = {
  img: string;
  name: string;
};

export type Recipe = {
  id: number;
  thumbnail: string;
  name: string;
  name_en: string;
  slug: string;
  cal?: number;
  time?: number;
  serving?: number;
  created_at: string;
};

export type RecipeCardProps = {
  className?: string;
  imgHeight?: string;
  author: Author;
  recipe: Recipe;
  isLiked: boolean;
  width?: string;
};

const MORE_HORIZONTAL_ICON_WIDTH = "1.4rem";
const HEART_ICON_WIDTH = "1.7rem";

const RecipeCard = ({
  className,
  imgHeight,
  author,
  recipe,
  isLiked,
  width,
}: RecipeCardProps) => {
  const themeContext = useContext(ThemeContext);
  const [isLikedActive, setIsLikedActive] = useState(isLiked);
  const recipeLink = `/recipe/${recipe.id}/${recipe.slug}`;

  const toggleLikeRecipe = () => {
    setIsLikedActive(!isLikedActive);
  };

  return (
    <div className={className} style={{ width: width || "inherit" }}>
      <div className="flex gap-3 items-center">
        <BaseAvatar
          img={author.img}
          size="36px"
          borderRadius={themeContext.borderRadiusSm}
        />
        <div>
          <h3>{author.name}</h3>
          <CreatedAtLabel>{recipe.created_at}</CreatedAtLabel>
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
          <RecipeImg backgroundImage={recipe.thumbnail} imgHeight={imgHeight} />
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
        <Link href={recipeLink}>
          <div className="absolute bottom-0 right-0 m-2">
            <IconContainer padding="0.2rem 0.4rem">🏆</IconContainer>
          </div>
        </Link>
      </div>
      <Link href={recipeLink}>
        <h3>{recipe.name}</h3>
        <SubTitle>
          {recipe.cal} Kcal | {recipe.time} น. | {recipe.serving} ที่
        </SubTitle>
      </Link>
    </div>
  );
};

export default RecipeCard;
