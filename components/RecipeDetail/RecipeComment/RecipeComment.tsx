import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import MyAvatar from "@/components/Avatar/MyAvatar/MyAvatar";
import CommentInput from "@/components/Input/CommentInput/CommentInput";
import StarRating from "@/components/StarRating/StarRating";

type RecipeCommentProps = {
  commentList: any;
};

const RecipeComment = ({ commentList }: RecipeCommentProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <h3>
        <span>ความคิดเห็น </span>
        <span className="text-secondary">({commentList.length})</span>
      </h3>
      <div className="flex gap-2.5 mt-3">
        <MyAvatar />
        <div className="w-full">
          <StarRating className="my-2 mb-3" />
          <CommentInput />
        </div>
      </div>
    </div>
  );
};

export default RecipeComment;
