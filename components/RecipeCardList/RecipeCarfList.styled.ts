import styled from "styled-components";
import { ScrollHorizontal } from "../Mixin/Mixin";

export const RecipeCardListScroll = styled(ScrollHorizontal)``;

type RecipeCardListContainerType = {
  scrollable: boolean;
  grid?: number;
};

export const RecipeCardListContainer = styled.div<RecipeCardListContainerType>`
  position: relative;
  gap: 0.8rem;
  ${({ scrollable, grid }) =>
    scrollable
      ? `display: inline-flex;`
      : `display: grid; grid-template-columns: repeat(${grid || "2"}, 1fr);`};
`;
