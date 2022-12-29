import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import BaseAvatar from "@/components/Avatar/BaseAvatar/BaseAvatar";
import ReadMore from "@/components/ReadMore/ReadMore";
import CommentInput from "@/components/Input/CommentInput/CommentInput";
import { VerticalLine } from "./RecipeFeedback.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";

type RecipeFeedbackProps = {
  comment: any;
};

const RecipeFeedback = ({ comment }: RecipeFeedbackProps) => {
  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();

  const [isShowCommentInput, setIsShowCommentInput] = useState(false);

  let gap: number = 0;

  if (isMobile) {
    gap = 3;
  } else {
    gap = 5;
  }

  const renderCommentAvatar = (comment: any) => (
    <BaseAvatar
      img={comment.avatar}
      size="3.125rem"
      borderRadius={themeContext.borderRadiusSm}
    />
  );

  const renderComment = (comment: any) => (
    <>
      <div className="flex items-center gap-1">
        <h3>{comment.user}</h3>
        <p className="text-sm text-secondary mt-1">・{comment.created_at}</p>
      </div>
      <div className="my-1">
        <ReadMore limitText={75}>{comment.message}</ReadMore>
      </div>
    </>
  );

  return (
    <div className={`flex gap-${gap} my-5`}>
      <div>{renderCommentAvatar(comment)}</div>

      <div>
        {renderComment(comment)}
        <h3
          className="text-green"
          onClick={() => setIsShowCommentInput(!isShowCommentInput)}
        >
          ตอบกลับ
        </h3>

        {comment.comments.length > 0 &&
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
          ))}

        {isShowCommentInput && (
          <div className="mt-3">
            <CommentInput />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeFeedback;
