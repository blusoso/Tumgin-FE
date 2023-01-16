import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import BaseAvatar from "@/components/Avatar/BaseAvatar/BaseAvatar";
import ReadMore from "@/components/ReadMore/ReadMore";
import CommentInput from "@/components/Input/CommentInput/CommentInput";
import { VerticalLine } from "./RecipeFeedback.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import moment from "moment";
import StarRating from "@/components/StarRating/StarRating";
import { ReviewData } from "@/services/recipe/getReviewList";

type RecipeFeedbackProps = {
  review: ReviewData;
};

const RecipeFeedback = ({ review }: RecipeFeedbackProps) => {
  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();

  const [isShowCommentInput, setIsShowCommentInput] = useState(false);

  let gap: number = 0;

  if (isMobile) {
    gap = 3;
  } else {
    gap = 5;
  }

  const renderCommentAvatar = (avatarImage?: string) => (
    <BaseAvatar
      img={avatarImage || ""}
      size="3.125rem"
      borderRadius={themeContext.borderRadiusSm}
    />
  );

  const renderReview = (review: ReviewData) => (
    <>
      <div className="flex items-center gap-1">
        <h3>{review.user.username}</h3>
        <p className="text-sm text-secondary mt-1">
          ・{moment(review.created_at).fromNow()}
        </p>
      </div>

      <div className="w-full">
        <StarRating
          className="my-1 mb-2"
          defaultRating={review.rating}
          starWidth="1.2rem"
        />
      </div>

      <div className="my-1">
        <ReadMore limitText={75}>{review.comment}</ReadMore>
      </div>
    </>
  );

  return (
    <div className={`flex gap-${gap} my-5`}>
      {review && (
        <>
          <div>{renderCommentAvatar(review.user.profile_img)}</div>

          <div>
            {renderReview(review)}
            {/* <h3
              className="text-green"
              onClick={() => setIsShowCommentInput(!isShowCommentInput)}
            >
              ตอบกลับ
            </h3> */}

            {/* {comment.comments.length > 0 &&
          comment.comments.map((subComment: any, index: number) => (
            <div
              key={`receip__sub-comment--${subComment.id}-${index}`}
              className={`flex gap-${gap} mt-4`}
            >
              <div>
                {renderCommentAvatar(subComment)}

                {comment.comments.length - 1 !== index && isMobile && (
                  <VerticalLine className="-ml-3" />
                )}
              </div>
              <div>{renderComment(subComment)}</div>
            </div>
          ))} */}

            {/* {isShowCommentInput && (
              <div className="mt-3">
                <CommentInput />
              </div>
            )} */}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeFeedback;
