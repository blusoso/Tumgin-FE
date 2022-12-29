import React from "react";
import { CreatedAtLabel } from "@/components/Card/RecipeCard.styled";
import { DifficultLevelLabel, NutritionCard } from "./RecipeInfo.styled";
import { DIFFICULT_LEVEL } from "@/pages/recipe/[id]/[slug]";
import RecipeImagePreview from "../RecipeImagePreview/RecipeImagePreview";
import RecipeInfoList from "../RecipeInfoList/RecipeInfoList";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";

type RecipeInfoProps = {
  recipe: any;
};

const RecipeInfo = ({ recipe }: RecipeInfoProps) => {
  const isMobile = useDetectMobile();

  const nutritionList = [
    {
      name: "🥩 โปรตีน",
      value: recipe.protein,
      percent: recipe.protein_percent,
    },
    {
      name: "🧀 ไขมัน",
      value: recipe.fat,
      percent: recipe.fat_percent,
    },
    {
      name: "🍙 คาร์บ",
      value: recipe.carb,
      percent: recipe.carb_percent,
    },
  ];

  const renderDifficultLevelLabel = (difficultLevel: string) => {
    switch (difficultLevel) {
      case DIFFICULT_LEVEL.EASY:
        return "🥰 ง่าย";
      case DIFFICULT_LEVEL.MID:
        return "😊 ปานกลาง";
      case DIFFICULT_LEVEL.HIGH:
        return "😏 ยาก";
      default:
        return;
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
        <CreatedAtLabel>{recipe.created_at}</CreatedAtLabel>
        <h2 className="mt-1">{recipe.name}</h2>
        <DifficultLevelLabel>
          {renderDifficultLevelLabel(recipe.difficult_level)}
        </DifficultLevelLabel>
      </div>
      <div className="my-3">
        <RecipeImagePreview
          recipe={recipe}
          imgHeight={isMobile ? "15rem" : "28rem"}
        />
      </div>
      <div className="flex justify-between">
        <p className="text-secondary">123 คนเคยลองสูตรนี้</p>
        <p className="font-normal">⭐ {recipe.rating_avg}</p>
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
