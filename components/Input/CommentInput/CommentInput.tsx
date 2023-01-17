import React from "react";
import PaperPlaneIcon from "@/components/Icon/PaperPlaneIcon";
import Input, { INPUT_TYPE } from "../Input";
import { CommentInputWrapper, ImageIconWrapper } from "./CommentInput.styled";
import ImageIcon from "@/components/Icon/ImageIcon";

type CommentInput = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const CommentInput = ({
  value,
  placeholder,
  onChange,
  onSubmit,
}: CommentInput) => {
  return (
    <>
      <CommentInputWrapper>
        <Input
          id="recipe__comment-input"
          type={INPUT_TYPE.TEXTAREA}
          value={value}
          placeholder={placeholder}
          endIcon={<PaperPlaneIcon />}
          autoResizeTextArea
          onChange={onChange}
          onEndIconClick={onSubmit}
        />
        {/* <ImageIconWrapper>
          <ImageIcon />
        </ImageIconWrapper> */}
      </CommentInputWrapper>
    </>
  );
};

export default CommentInput;
