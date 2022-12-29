import Link from "next/link";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import ChevronIcon from "../Icon/ChevronIcon";
import { Topic, TopicLink } from "./TopicHeader.styled";

export type TopicHeaderProps = {
  title: string;
  titleColor?: string;
  linkLabel?: React.ReactNode | string;
  link?: string;
  paddingIconTop?: string;
  padding?: string;
};

const TopicHeader = ({
  title,
  titleColor,
  linkLabel,
  link,
  paddingIconTop = "0px",
  padding,
}: TopicHeaderProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className="flex justify-between" style={{ padding: padding }}>
      <Topic color={titleColor}>{title}</Topic>
      {link && linkLabel && (
        <TopicLink>
          <Link href={link} className="flex items-center">
            <span>{linkLabel}</span>
            <ChevronIcon
              color={themeContext.yellowColor}
              iconWidth="18px"
              style={{ paddingTop: paddingIconTop }}
            />
          </Link>
        </TopicLink>
      )}
    </div>
  );
};

export default TopicHeader;
