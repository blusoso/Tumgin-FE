import React from "react";
import PaperPlaneIcon from "@/components/Icon/PaperPlaneIcon";
import Input, { INPUT_TYPE } from "../Input";
import { CommentInputWrapper, ImageIconWrapper } from "./CommentInput.styled";
import ImageIcon from "@/components/Icon/ImageIcon";

const CommentInput = () => {
  return (
    <>
      <CommentInputWrapper>
        <Input
          id="recipe__comment-input"
          type={INPUT_TYPE.TEXTAREA}
          placeholder="เพิ่มความคิดเห็นของคุณ"
          endIcon={<PaperPlaneIcon />}
          autoResizeTextArea
          onEndIconClick={() => console.log("submit")}
        />
        <ImageIconWrapper>
          <ImageIcon />
        </ImageIconWrapper>
      </CommentInputWrapper>
    </>
  );
};

export default CommentInput;
