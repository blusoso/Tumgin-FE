import { zeroPad } from "@/utils/number";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import TopicHeader from "../TopicHeader/TopicHeader";

type DirectionListProps = {
  directionList: string[];
};

const DirectionList = ({ directionList }: DirectionListProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <div className="mt-6 mb-2">
        <TopicHeader title="ขั้นตอน" titleColor={themeContext.blackColor} />
      </div>

      {directionList.map((direction, index) => (
        <div key={`direction--${index}`} className="mb-2 flex gap-5">
          <h2 className="text-secondary--light -mt-1">{zeroPad(index + 1)}</h2>
          <p>{direction}</p>
        </div>
      ))}
    </>
  );
};

export default DirectionList;
