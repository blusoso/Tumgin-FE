import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import TopicHeader from "../TopicHeader/TopicHeader";
import { LinkHover } from "../Search/SearchRecipe/SearchRecipe.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";

type HistorySearchProps = {
  linkLabel?: React.ReactNode;
  topicPadding?: string;
};

const MOCK_HISTORY_SEARCH = [
  { name: "สปาเก็ตตี้เห็ด" },
  { name: "โอ๊ตมีล" },
  { name: "ซูกินีผัดน้ำพริกเผาไข่เค็ม" },
  { name: "เค้กแครอท" },
  { name: "ชีสเค้กช็อกโกแลต" },
];

const HistorySearch = ({ linkLabel, topicPadding }: HistorySearchProps) => {
  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();

  return (
    <div>
      <TopicHeader
        title="⌛ ประวัติการค้นหา"
        titleColor={themeContext.blackColor}
        linkLabel={linkLabel}
        link="/"
        paddingIconTop="2px"
        padding={topicPadding}
      />
      <div className="mt-2">
        {MOCK_HISTORY_SEARCH.map((history, index) =>
          isMobile || isTablet ? (
            <div key={`history-search--${index}`} className="py-1.5">
              {history.name}
            </div>
          ) : (
            <LinkHover key={`history-search--${index}`} className="py-1.5">
              {history.name}
            </LinkHover>
          )
        )}
      </div>
    </div>
  );
};

export default HistorySearch;
