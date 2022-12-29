import { APP_NAME, IMAGE_PATH } from "@/utils/constant";
import React from "react";
import RecipeCard from "../Card/RecipeCard";
import {
  RecipeCardListContainer,
  RecipeCardListScroll,
} from "./RecipeCarfList.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";

const avatarImg = `${IMAGE_PATH}/avatar.png`;
const recipeImg = `${IMAGE_PATH}/example-recipe.jpg`;

const AUTHOR = { img: avatarImg, name: APP_NAME };
const RECIPE_LIST = [
  {
    id: 1,
    thumbnail: recipeImg,
    name: "ข้าวไข่ข้นลูกชิ้นอกไก่",
    name_en: "Scramble Egg Rice Chicken",
    slug: "scramble-egg-rice-chicken",
    cal: 365,
    time: 30,
    serving: 1,
    isStaffPick: true,
    created_at: "1 วันที่แล้ว",
  },
  {
    id: 2,
    thumbnail: recipeImg,
    name: "ข้าวไข่ข้นลูกชิ้นอกไก่",
    name_en: "Scramble Egg Rice Chicken",
    slug: "scramble-egg-rice-chicken",
    cal: 365,
    time: 30,
    serving: 1,
    isStaffPick: true,
    created_at: "1 วันที่แล้ว",
  },
  {
    id: 3,
    thumbnail: recipeImg,
    name: "ข้าวไข่ข้นลูกชิ้นอกไก่",
    name_en: "Scramble Egg Rice Chicken",
    slug: "scramble-egg-rice-chicken",
    cal: 365,
    time: 30,
    serving: 1,
    isStaffPick: true,
    created_at: "1 วันที่แล้ว",
  },
  {
    id: 4,
    thumbnail: recipeImg,
    name: "ข้าวไข่ข้นลูกชิ้นอกไก่",
    name_en: "Scramble Egg Rice Chicken",
    slug: "scramble-egg-rice-chicken",
    cal: 365,
    time: 30,
    serving: 1,
    isStaffPick: true,
    created_at: "1 วันที่แล้ว",
  },
  {
    id: 5,
    thumbnail: recipeImg,
    name: "ข้าวไข่ข้นลูกชิ้นอกไก่",
    name_en: "Scramble Egg Rice Chicken",
    slug: "scramble-egg-rice-chicken",
    cal: 365,
    time: 30,
    serving: 1,
    isStaffPick: true,
    created_at: "1 วันที่แล้ว",
  },
  {
    id: 6,
    thumbnail: recipeImg,
    name: "ข้าวไข่ข้นลูกชิ้นอกไก่",
    name_en: "Scramble Egg Rice Chicken",
    slug: "scramble-egg-rice-chicken",
    cal: 365,
    time: 30,
    serving: 1,
    isStaffPick: true,
    created_at: "1 วันที่แล้ว",
  },
];

type RecipeCardListProps = {
  scrollable?: boolean;
};

type RenderRecipeListType = {
  scrollable?: boolean;
};

const DEFAULT_RECIPE_CARD_WIDTH = "170px";

const RecipeCardList = ({ scrollable = false }: RecipeCardListProps) => {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();

  let grid: number;
  let imgHeight: string;

  if (isMobile) {
    grid = 2;
    imgHeight = "9.6rem";
  } else if (isTablet) {
    grid = 3;
    imgHeight = "13rem";
  } else {
    grid = 5;
    imgHeight = "14rem";
  }

  const renderRecipeList = (props?: RenderRecipeListType) => {
    return RECIPE_LIST.map((recipe, index) => {
      const lastCard = index === RECIPE_LIST.length - 1 ? "mr-4" : "";

      return (
        <React.Fragment key={`recipe-card--${index}`}>
          <RecipeCard
            className={props?.scrollable ? lastCard : ""}
            imgHeight={imgHeight}
            width={props?.scrollable ? DEFAULT_RECIPE_CARD_WIDTH : ""}
            author={AUTHOR}
            recipe={recipe}
            isLiked={false}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="my-4">
      {scrollable ? (
        <RecipeCardListScroll className="-mr-5">
          <RecipeCardListContainer scrollable={scrollable}>
            {renderRecipeList({ scrollable })}
          </RecipeCardListContainer>
        </RecipeCardListScroll>
      ) : (
        <RecipeCardListContainer scrollable={scrollable} grid={grid}>
          {renderRecipeList()}
        </RecipeCardListContainer>
      )}
    </div>
  );
};

export default RecipeCardList;
