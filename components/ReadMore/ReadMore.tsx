import React, { useState } from "react";
import { ReadMoreStyle } from "./ReadMore.styled";

type ReadMoreProps = {
  limitText?: number;
  children: string;
};

const LIMIT_STRING = 130;

const ReadMore = ({ limitText = LIMIT_STRING, children }: ReadMoreProps) => {
  const content: string = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const sliceContent = (content: string) => {
    return content.slice(0, limitText);
  };

  const renderContent = () => {
    return isReadMore ? sliceContent(content) : content;
  };

  const renderReadMore = () => {
    return (
      <ReadMoreStyle onClick={toggleReadMore}>
        {isReadMore ? (
          <>
            <span>...</span>
            <span>แสดงเพิ่มเติม</span>
          </>
        ) : (
          <span>แสดงน้อยลง</span>
        )}
      </ReadMoreStyle>
    );
  };

  return (
    <>
      {renderContent()}
      {content.length > limitText && renderReadMore()}
    </>
  );
};

export default ReadMore;
