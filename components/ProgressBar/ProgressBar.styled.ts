import styled, { css } from "styled-components";

const PROGRESS_BAR_HEIGHT = "0.6rem";

type BaseProgressBarProps = {
  width: string;
  backgroundColor: string;
};

const BaseProgressBar = ({
  width,
  backgroundColor,
}: BaseProgressBarProps) => css`
  width: ${width};
  height: ${PROGRESS_BAR_HEIGHT};
  background-color: ${backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadiusLg};
`;

export const ProgressBarWrapperStyle = styled.div`
  ${({ theme }) =>
    BaseProgressBar({ width: "100%", backgroundColor: theme.lightGreenColor })};
`;

type ProgressBarStyleProps = {
  width: string;
};

export const ProgressBarStyle = styled.div<ProgressBarStyleProps>`
  ${({ width, theme }) =>
    BaseProgressBar({ width: width, backgroundColor: theme.greenColor })};
`;
