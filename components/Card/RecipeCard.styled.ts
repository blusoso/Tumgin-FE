import styled from "styled-components";

export const CreatedAtLabel = styled.p`
  color: ${({ theme }) => theme.grayColor};
  font-size: 12px;
`;

type RecipeImgType = {
  backgroundImage: string;
  imgHeight?: string;
};

export const RecipeImg = styled.div<RecipeImgType>`
  background: ${({ backgroundImage }) => `url("${backgroundImage}")`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: ${({ imgHeight }) => imgHeight || "100%"};

  border-radius: ${({ theme }) => theme.borderRadiusLg};
`;

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.grayColor};
  font-size: 12px;
`;

type IconContainerType = {
  isActive?: boolean;
  padding?: string;
};

export const IconContainer = styled.div<IconContainerType>`
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.redColor : "white"};
  border-radius: ${({ theme }) => theme.borderRadiusMd};
  padding: ${({ padding }) => padding || "0.2rem"};
  font-size: 12px;

  svg {
    fill: ${({ isActive, theme }) => (isActive ? "white" : theme.redColor)};
  }
`;
