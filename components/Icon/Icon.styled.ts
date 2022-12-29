import styled from "styled-components";

export type IconStyledProps = {
  className?: string;
  style?: any;
  iconWidth?: string;
  iconHeight?: string;
  color?: string;
  onClick?: () => void;
};

export const IconStyled = styled.div<IconStyledProps>`
  svg {
    width: ${({ iconWidth }) => iconWidth || "1.8em"};
    height: ${({ iconHeight }) => iconHeight || "auto"};
    fill: ${({ color, theme }) => color || theme.greenColor} !important;
    cursor: pointer;
  }
`;
