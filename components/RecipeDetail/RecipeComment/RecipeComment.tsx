import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import MyAvatar from "@/components/Avatar/MyAvatar/MyAvatar";
import CommentInput from "@/components/Input/CommentInput/CommentInput";
import StarRating from "@/components/StarRating/StarRating";

type RecipeCommentProps = {
  reviewAmount: number;
};

const RecipeComment = ({ reviewAmount }: RecipeCommentProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <h3>
        <span>ความคิดเห็น </span>
        {reviewAmount > 0 && (
          <span className="text-secondary">({reviewAmount})</span>
        )}
      </h3>
      <div className="flex gap-2.5 mt-3">
        <MyAvatar />
        <div className="w-full">
          <StarRating className="my-2 mb-3" isResetRating canSelect />
          <CommentInput />
        </div>
      </div>
    </div>
  );
};

export default RecipeComment;
