import React from "react";
import RecipeFeedback from "../RecipeFeedback/RecipeFeedback";
import { ReviewData } from "@/services/recipe/getReviewList";

type RecipeFeedbackListProps = {
  reviewList: ReviewData[];
};

const RecipeFeedbackList = ({ reviewList }: RecipeFeedbackListProps) => {
  return (
    <div className="mt-6">
      {reviewList.map((review: ReviewData) => (
        <React.Fragment key={`recipe__feedback--${review.id}`}>
          <RecipeFeedback review={review} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default RecipeFeedbackList;
