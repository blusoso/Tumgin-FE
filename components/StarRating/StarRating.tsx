import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import StarIcon from "../Icon/StarIcon";

type StarRatingProps = {
  className?: string;
  totalStar?: number;
  starWidth?: string;
  onStarRatingClick?: () => void;
};

const TOTAL_STAR = 5;
const STAR_WIDTH = "1.7rem";

const StarRating = ({
  className = "",
  totalStar = TOTAL_STAR,
  starWidth = STAR_WIDTH,
  onStarRatingClick,
}: StarRatingProps) => {
  const themeContext = useContext(ThemeContext);
  const [rating, setRating] = useState(0);

  const handleStarRating = (index: number) => {
    setRating(index);
    if (onStarRatingClick) onStarRatingClick();
  };

  const resetStarRating = () => {
    setRating(0);
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex">
        {[...Array(totalStar)].map((star, index) => {
          index = index + 1;

          return (
            <div
              key={`star-rating--${index}`}
              className="mr-1"
              onClick={() => handleStarRating(index)}
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
      <div
        className="text-secondary underline underline-offset-4 cursor-pointer"
        onClick={resetStarRating}
      >
        รีเซ็ตดาว
      </div>
    </div>
  );
};

export default StarRating;
