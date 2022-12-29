import styled from "styled-components";

type IconWrapperProps = {
  isMobile: boolean;
  hasBorder?: boolean;
};

export const IconWrapper = styled.div<IconWrapperProps>`
  margin-bottom: ${({ isMobile }) => (isMobile ? "" : "1rem")};
  margin-top: ${({ isMobile }) => (isMobile ? "0.25rem" : "")};

  ${({ hasBorder, theme, isMobile }) =>
    !isMobile && hasBorder && "border: 1px solid " + theme.lightGrayColor};
  border-radius: ${({ theme }) => theme.borderRadiusMd};
  padding: ${({ isMobile }) => (!isMobile ? "0.2rem 0.3rem" : "")};
  cursor: pointer;
`;

export const HeartIconWrapper = styled.div`
  svg {
    fill: ${({ theme }) => theme.redColor};
  }
`;
