import React from "react";
import { RecipeImgs, StaffPickBadge } from "../RecipeInfo/RecipeInfo.styled";

type RecipeImagePreviewProps = {
  recipe: any;
  imgHeight?: string;
};

const IMAGE_HEIGHT = "15rem";

const RecipeImagePreview = ({
  recipe,
  imgHeight = IMAGE_HEIGHT,
}: RecipeImagePreviewProps) => {
  return (
    <div className="relative">
      <RecipeImgs backgroundImage={recipe.thumbnail} height={imgHeight} />
      {recipe && (
        <StaffPickBadge>
          <p>🏆 STAFF PICK!</p>
        </StaffPickBadge>
      )}
    </div>
  );
};

export default RecipeImagePreview;
