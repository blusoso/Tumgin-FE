import React from "react";
import { RecipeData } from "@/services/recipe/getRecipe";
import { formatTime } from "@/utils/time";

type RecipeInfoListProps = {
  recipe: RecipeData;
};

const RecipeInfoList = ({ recipe }: RecipeInfoListProps) => {
  const recipeInfoList = [
    { emoji: "🔥", value: recipe.calory, unit: "Kcal" },
    { emoji: "🕒", value: formatTime(recipe.minute || 0) },
    { emoji: "🥣", value: recipe.serving, unit: "ที่" },
  ];

  return (
    <div className="grid gap-3 grid-cols-3 my-3">
      {recipeInfoList.map((recipeInfo, index) => (
        <div
          key={`recipe-info--${index}`}
          className={
            index == 0
              ? "text-left"
              : recipeInfoList.length - 1 === index
              ? "text-right"
              : "text-center"
          }
        >
          <span>
            {recipeInfo.emoji} {recipeInfo.value}
          </span>{" "}
          <span className="text-secondary">{recipeInfo.unit}</span>
        </div>
      ))}
    </div>
  );
};

export default RecipeInfoList;
