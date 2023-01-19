import React, { useState } from "react";

import MyAvatar from "@/components/Avatar/MyAvatar/MyAvatar";
import CommentInput from "@/components/Input/CommentInput/CommentInput";
import StarRating from "@/components/StarRating/StarRating";
import { useRecoilState } from "recoil";
import { reviewInputState } from "@/recoils/index";

type RecipeCommentProps = {
  profileImg: string;
  reviewAmount: number;
  onStarRating: (newRating: number) => void;
  onReviewMessageChange: (e: any) => void;
  onSubmit: () => void;
};

const RecipeComment = ({
  profileImg,
  reviewAmount,
  onStarRating,
  onReviewMessageChange,
  onSubmit,
}: RecipeCommentProps) => {
  const [rating, setRating] = useState(0);
  const [reviewInput, setReviewInput] = useRecoilState(reviewInputState);

  const handleStarRating = (index: number) => {
    setRating(index);
    onStarRating(index);
  };

  const handleResetStarRating = () => {
    setRating(0);
  };

  const clearReviewInput = () => {
    setReviewInput({ rating: 0, message: "" });
    handleResetStarRating();
  };

  const handleSubmit = () => {
    if (reviewInput.message) {
      clearReviewInput();
      onSubmit();
    }
  };

  return (
    <>
      

      <div className="flex gap-2.5 mt-3">
        <MyAvatar img={profileImg} />
        <div className="w-full">
          <StarRating
            className="my-2 mb-3"
            rating={rating}
            handleStarRating={handleStarRating}
            onResetStarRating={handleResetStarRating}
            isResetRating
          />
          <CommentInput
            value={reviewInput.message}
            placeholder="เพิ่มความคิดเห็นของคุณ"
            onChange={onReviewMessageChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default RecipeComment;
