import styled from "styled-components";
import { BackgroundFadeToTop } from "./../Mixin/Mixin";

export const ButtonFooterSection = styled(BackgroundFadeToTop)`
  position: fixed;
  bottom: 0;
  left: 50%;
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  width: 100%;
`;

type ButtonFooterWrapperType = {
  hasTwoButton: boolean;
};

export const ButtonFooterWrapper = styled.div<ButtonFooterWrapperType>`
  margin: 1.6rem ${({ hasTwoButton }) => (hasTwoButton ? "1.25rem" : "auto")};
  width: ${({ hasTwoButton }) => (hasTwoButton ? "auto" : "fit-content")};
  ${({ hasTwoButton }) =>
    hasTwoButton && "display: flex; justify-content: space-between; gap: 1rem;"}

  button {
    ${({ hasTwoButton }) => hasTwoButton && "width: 100%;"}
  }
`;
