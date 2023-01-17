import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import StarIcon from "../Icon/StarIcon";

type StarRatingProps = {
  className?: string;
  totalStar?: number;
  starWidth?: string;
  isResetRating?: boolean;
  defaultRating?: number;
  rating: number;
  handleStarRating?: (index: number) => void;
  onResetStarRating?: () => void;
};

const TOTAL_STAR = 5;
const STAR_WIDTH = "1.7rem";

const StarRating = ({
  className = "",
  totalStar = TOTAL_STAR,
  starWidth = STAR_WIDTH,
  isResetRating = false,
  defaultRating,
  rating,
  handleStarRating,
  onResetStarRating,
}: StarRatingProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex">
        {[...Array(totalStar)].map((star, index) => {
          index = index + 1;

          return (
            <div
              key={`star-rating--${index}`}
              className="mr-1"
              onClick={() => handleStarRating && handleStarRating(index)}
            >
              <StarIcon
                isOutline={false}
                iconWidth={starWidth}
                color={
                  index <= rating
                    ? themeContext.yellowColor
                    : themeContext.lightGrayColor
                }
              />
            </div>
          );
        })}
      </div>

      {isResetRating && (
        <div
          className="text-secondary underline underline-offset-4 cursor-pointer"
          onClick={onResetStarRating}
        >
          รีเซ็ตดาว
        </div>
      )}
    </div>
  );
};

export default StarRating;
