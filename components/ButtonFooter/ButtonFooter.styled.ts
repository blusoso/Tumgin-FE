import styled from "styled-components";
import { BackgroundFadeToTop } from "./../Mixin/Mixin";

type ButtonFooterSectionProps = {
  isFixed?: boolean;
};

export const ButtonFooterSection = styled(
  BackgroundFadeToTop
)<ButtonFooterSectionProps>`
  ${({ isFixed }) =>
    isFixed &&
    "position: fixed; bottom: 0; left: 50%; -ms-transform: translate(-50%, 0); transform: translate(-50%, 0);"}
  width: 100%;
`;

type ButtonFooterWrapperType = {
  hasTwoButton: boolean;
  isFixed?: boolean;
};

export const ButtonFooterWrapper = styled.div<ButtonFooterWrapperType>`
  margin: 1.6rem
    ${({ hasTwoButton, isFixed }) =>
      hasTwoButton && isFixed ? "1.25rem" : "auto"};
  width: ${({ hasTwoButton }) => (hasTwoButton ? "auto" : "fit-content")};
  ${({ hasTwoButton }) =>
    hasTwoButton && "display: flex; justify-content: space-between; gap: 1rem;"}

  button {
    ${({ hasTwoButton }) => hasTwoButton && "width: 100%;"}
  }
`;
