import React, { useEffect, useState } from "react";
import moment from "moment";

import { RecipeData } from "@/services/recipe/getRecipe";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";

import { DIFFICULT_LEVEL } from "@/pages/recipe/[id]/[slug]";
import RecipeImagePreview from "../RecipeImagePreview/RecipeImagePreview";
import RecipeInfoList from "../RecipeInfoList/RecipeInfoList";

import { CreatedAtLabel } from "@/components/Card/RecipeCard.styled";
import { DifficultLevelLabel, NutritionCard } from "./RecipeInfo.styled";
import { IMAGE_PATH } from "@/utils/constant";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";

type RecipeInfoProps = {
  recipe: RecipeData;
};

const DEFAULT_IMG = `${IMAGE_PATH}/default-image.jpg`;

const RecipeInfo = ({ recipe }: RecipeInfoProps) => {
  const isMobile = useDetectMobile();
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    if (recipe) {
      setImageList(
        recipe.recipe_images.map((recipeImg) => recipeImg.image.img)
      );
    }
  }, [recipe]);

  const nutritionList = [
    {
      name: "🥩 โปรตีน",
      value: recipe.protein_gram,
      percent: recipe.protein_percent,
    },
    {
      name: "🧀 ไขมัน",
      value: recipe.fat_gram,
      percent: recipe.fat_percent,
    },
    {
      name: "🍙 คาร์บ",
      value: recipe.carb_gram,
      percent: recipe.carb_percent,
    },
  ];

  const renderDifficultLevelLabel = (difficultLevel: number) => {
    switch (difficultLevel) {
      case 1:
        return "🥰 ง่าย";
      case 2:
        return "😊 ปานกลาง";
      case 3:
        return "😏 ยาก";
      default:
        return "😏 ปานกลาง";
    }
  };

  const progressBar = (percent: number) => (
    <div className="w-full bg-white rounded-full h-2.5 my-1.5">
      <div
        className="bg-yellow h-2.5 rounded-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );

  const renderNutrition = (nutrition: any) => {
    const { name, percent, value } = nutrition;

    return (
      <NutritionCard>
        <p className="text-green font-normal -ml-2">{name}</p>
        {progressBar(percent)}
        <p className="text-sm">
          <span className="font-normal">{value}</span>g (
          <span className="font-normal">{percent}%</span>)
        </p>
      </NutritionCard>
    );
  };

  return (
    <div className="mt-2">
      <div className="text-center">
        <CreatedAtLabel>{moment(recipe.created_at).fromNow()}</CreatedAtLabel>
        <h2 className="mt-1">{recipe.name}</h2>
        {recipe.difficult_level && (
          <DifficultLevelLabel>
            {renderDifficultLevelLabel(recipe.difficult_level)}
          </DifficultLevelLabel>
        )}
      </div>

      <div className="my-3">
        {imageList.length > 0 ? (
          <ImageCarousel
            images={imageList}
            imgHeight={isMobile ? "15rem" : "28rem"}
          />
        ) : (
          <ImageCarousel
            images={[DEFAULT_IMG]}
            imgHeight={isMobile ? "15rem" : "28rem"}
          />
        )}
      </div>
      <div className="flex justify-between">
        <p className="text-secondary">
          {recipe.review_amount
            ? `${recipe.review_amount} คนเคยลองสูตรนี้`
            : "ยังไม่เคยมีใครลองสูตรนี้ ลองเลยคุณคนแรก!"}
        </p>
        <p className="font-normal">
          ⭐ {recipe.review_amount > 0 ? recipe.review_avg : "-"}
        </p>
      </div>

      <RecipeInfoList recipe={recipe} />

      <div className="grid gap-2 grid-cols-3 my-3">
        {nutritionList.map((nutrition, index) => (
          <div key={`nutrition--${index}`}>{renderNutrition(nutrition)}</div>
        ))}
      </div>
    </div>
  );
};

export default RecipeInfo;
