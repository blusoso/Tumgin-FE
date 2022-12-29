import styled from "styled-components";

export const MenuSidebarWrapper = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99;
`;

export const MenuSidebarPanel = styled.div`
  background: white;
  width: 81vw;
  height: 100%;
  border-radius: 0
    ${({ theme }) => `${theme.borderRadiusXl} ${theme.borderRadiusXl}`} 0;
  padding: 1.625rem 1.125rem;
`;

export const DimBackground = styled.div`
  background: ${({ theme }) => theme.blackColor};
  opacity: 0.25;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
`;

type MenuItemProps = {
  margin?: string;
};

export const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: ${({ margin }) => margin || "0"};
  cursor: pointer;
`;

export const MenuNameStyle = styled.h3<{ isActive: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.greenColor : theme.blackColor};
`;
