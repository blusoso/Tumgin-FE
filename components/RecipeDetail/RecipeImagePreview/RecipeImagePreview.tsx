import React from "react";
import { RecipeImgs, StaffPickBadge } from "../RecipeInfo/RecipeInfo.styled";
import { RecipeData } from "@/services/recipe/getRecipe";

type RecipeImagePreviewProps = {
  recipe: RecipeData;
  imgHeight?: string;
};

const IMAGE_HEIGHT = "15rem";

const RecipeImagePreview = ({
  recipe,
  imgHeight = IMAGE_HEIGHT,
}: RecipeImagePreviewProps) => {
  return (
    <div className="relative">
      {recipe && (
        <>
          <RecipeImgs
            backgroundImage={recipe.thumbnail_img || ""}
            height={imgHeight}
          />
          {recipe.is_staff_pick && (
            <StaffPickBadge>
              <p>🏆 STAFF PICK!</p>
            </StaffPickBadge>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeImagePreview;
