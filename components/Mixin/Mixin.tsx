import styled from "styled-components";

export const HideScrollBar = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollHorizontal = styled(HideScrollBar)`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`;

type SelectBoxProps = {
  isActive?: boolean;
};

export const SelectBox = styled.div<SelectBoxProps>`
  border: 1px solid
    ${({ isActive, theme }) =>
      isActive ? theme.greenColor : theme.lightGrayColor};
  border-radius: ${({ theme }) => theme.borderRadiusMd};
  padding: 0.8rem 0.3rem;
  color: ${({ isActive, theme }) =>
    isActive ? theme.greenColor : theme.grayColor};
  font-weight: ${({ isActive }) => (isActive ? 400 : 300)};
  cursor: pointer;
`;

export const BackgroundFadeToTop = styled.div`
  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 1),
    rgba(255, 0, 0, 0)
  );
`;
