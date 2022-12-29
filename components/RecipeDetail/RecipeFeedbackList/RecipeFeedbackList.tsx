import React from "react";
import RecipeFeedback from "../RecipeFeedback/RecipeFeedback";

type RecipeFeedbackListProps = {
  commentList: any[];
};

const RecipeFeedbackList = ({ commentList }: RecipeFeedbackListProps) => {
  return (
    <div className="mt-6">
      {commentList.map((comment: any, index: number) => (
        <React.Fragment key={`recipe__feedback--${index}`}>
          <RecipeFeedback comment={comment} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default RecipeFeedbackList;
