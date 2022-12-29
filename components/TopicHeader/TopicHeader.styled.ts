import styled from "styled-components";

type TopicProps = {
  color?: string;
};

export const Topic = styled.h3<TopicProps>`
  color: ${({ color, theme }) => color || theme.greenColor};
`;

export const TopicLink = styled.div`
  color: ${({ theme }) => theme.yellowColor};
`;
