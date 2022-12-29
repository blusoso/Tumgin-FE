import styled from "styled-components";

export const TabMenuWrapper = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrayColor};
`;

type TabMenuStyleProps = {
  isActive: boolean;
};

export const TabMenuStyle = styled.div<TabMenuStyleProps>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.greenColor : theme.grayColor};
  padding: 0 0.4rem 0.5rem 0.4rem;
  ${({ isActive, theme }) =>
    isActive && `border-bottom: 3px solid ${theme.greenColor}`};
  cursor: pointer;

  h3 {
    font-weight: ${({ isActive }) => (isActive ? 400 : 300)};
  }
`;
