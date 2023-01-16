import React from "react";
import Button, { BUTTON_TYPE } from "../Button";
import ChevronIcon from "@/components/Icon/ChevronIcon";

const DEFAULT_LOAD_MORE_BUTTON_TEXT = "ดูความคิดเห็นเพิ่ม";

type LoadMoreButtonProps = {
  text?: string;
  onLoadMoreClick: () => void;
};

const LoadMoreButton = ({
  text = DEFAULT_LOAD_MORE_BUTTON_TEXT,
  onLoadMoreClick,
}: LoadMoreButtonProps) => {
  return (
    <>
      <Button
        type={BUTTON_TYPE.PRIMARY_OUTLINE}
        width="100%"
        onClick={onLoadMoreClick}
      >
        <div className="flex items-center justify-center">
          <p>{text}</p>
          <ChevronIcon rotation="down" />
        </div>
      </Button>
    </>
  );
};

export default LoadMoreButton;
