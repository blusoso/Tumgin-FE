import { zeroPad } from "@/utils/number";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import TopicHeader from "../TopicHeader/TopicHeader";
import { TrendNoStyle } from "./Trend.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import { LinkHover } from "../Search/SearchRecipe/SearchRecipe.styled";

type TrendProps = {
  linkLabel?: React.ReactNode;
  topicPadding?: string;
};

const MOCK_TREND_LIST = [
  { name: "สปาเก็ตตี้เห็ด" },
  { name: "โอ๊ตมีล" },
  { name: "ซูกินีผัดน้ำพริกเผาไข่เค็ม" },
  { name: "เค้กแครอท" },
  { name: "ชีสเค้กช็อกโกแลต" },
];

const Trend = ({ linkLabel, topicPadding }: TrendProps) => {
  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();

  const renderTrendItem = (trendItem: any, index: number) => (
    <>
      <TrendNoStyle>{zeroPad(index + 1, 2)}</TrendNoStyle>
      <span>{trendItem.name}</span>
    </>
  );

  return (
    <div>
      <TopicHeader
        title="📈 เทรนด์"
        titleColor={themeContext.blackColor}
        linkLabel={linkLabel}
        link="/"
        paddingIconTop="2px"
        padding={topicPadding}
      />
      <div className="mt-2">
        {MOCK_TREND_LIST.map((trendItem, index: number) =>
          isMobile || isTablet ? (
            <div
              key={`trend-item--${index}`}
              className="py-1.5 flex items-center gap-3"
            >
              {renderTrendItem(trendItem, index)}
            </div>
          ) : (
            <LinkHover
              key={`trend-item--${index}`}
              className="py-1.5 flex items-center gap-3"
            >
              {renderTrendItem(trendItem, index)}
            </LinkHover>
          )
        )}
      </div>
    </div>
  );
};

export default Trend;
