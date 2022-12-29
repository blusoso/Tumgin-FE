import styled from "styled-components";

type IconPositionType = {
  isStartIcon: boolean;
  isEndIcon: boolean;
};

export const InputWrapper = styled.div<IconPositionType>`
  position: relative;
  width: 100%;
`;

export const InputIcon = styled.div`
  position: absolute;
  width: 22px;
  top: 50%;
  transform: translate(0, -55%);
`;

type InputIconType = {
  isClickable: boolean;
} & IconPositionType;

export const InputStartIcon = styled(InputIcon)<InputIconType>`
  ${({ isStartIcon }) => isStartIcon && "left: 1.1em;"}
  fill: ${({ isClickable, theme }) =>
    isClickable ? theme.greenColor : theme.lightGrayColor};
`;

export const InputEndIcon = styled(InputIcon)<InputIconType>`
  ${({ isEndIcon }) => isEndIcon && "right: 1.1em;"}
  fill: ${({ isClickable, theme }) =>
    isClickable ? theme.greenColor : theme.lightGrayColor};

  &.switch-icon--ingredient {
    fill: ${({ theme }) => theme.yellowColor}!important;
  }
`;

export const InputStyled = styled.input<IconPositionType>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.lightGrayColor};
  border-radius: ${({ theme }) => theme.borderRadiusLg};
  padding: 0.6em ${({ isEndIcon }) => (isEndIcon ? "3em" : "1.2em")} 0.6em
    ${({ isStartIcon }) => (isStartIcon ? "3em" : "1.2em")};
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.defaultFontSize};
  font-weight: 400;

  &::placeholder {
    color: ${({ theme }) => theme.grayColor};
    font-weight: 300;
  }

  &:focus {
    outline: none;
  }

  &.input-number {
    width: 6rem;
    padding: 0.2rem 2rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizeSm};
    font-weight: 300;
  }
`;

export const TextareaStyled = styled.textarea<IconPositionType>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.lightGrayColor};
  border-radius: ${({ theme }) => theme.borderRadiusLg};
  padding: 0.6em ${({ isEndIcon }) => (isEndIcon ? "3em" : "1.2em")} 0.6em
    ${({ isStartIcon }) => (isStartIcon ? "3em" : "1.2em")};
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.defaultFontSize};
  font-weight: 400;

  &::placeholder {
    color: ${({ theme }) => theme.grayColor};
    font-weight: 300;
  }

  &:focus {
    outline: none;
  }

  &.input-number {
    width: 6rem;
    padding: 0.2rem 2rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizeSm};
    font-weight: 300;
  }
`;
