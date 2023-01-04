import styled from "styled-components";
import { DEFAULT_PADDING_SEARCH_SELECT_MODAL } from "./SearchRecipe";

export const SearchInputWrapper = styled.div``;

export const SearchSelectWrapper = styled.div`
  position: absolute;
  top: 120%;
  left: 0;

  font-weight: 300;
  text-align: left;
  cursor: pointer;
`;

type LinkHoverProps = {
  padding?: string;
};

export const LinkHover = styled.div<LinkHoverProps>`
  padding: ${({ padding }) => padding || DEFAULT_PADDING_SEARCH_SELECT_MODAL};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.greenColor};
    background-color: ${({ theme }) => theme.lightGreenColor};
    font-weight: 400;
  }
`;

export const RecommendSearchStyle = styled.div<LinkHoverProps>`
  padding: ${({ padding }) => padding || DEFAULT_PADDING_SEARCH_SELECT_MODAL};
`;
