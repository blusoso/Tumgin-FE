import styled from "styled-components";

type ModalOverlayProps = {
  position?: string;
  isOverlay: boolean;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  alignItem?: string;
};

export const ModalOverlay = styled.div<ModalOverlayProps>`
  position: ${({ position }) => position || "fixed"};
  top: ${({ top, isOverlay }) => (isOverlay ? 0 : top)};
  left: ${({ left, isOverlay }) => (isOverlay ? 0 : left)};
  right: ${({ right, isOverlay }) => (isOverlay ? 0 : right)};
  bottom: ${({ bottom, isOverlay }) => (isOverlay ? 0 : bottom)};
  ${({ isOverlay }) => isOverlay && "background: rgba(0, 0, 0, 0.5);"}

  display: flex;
  align-items: ${({ alignItem }) => alignItem || "center"};
  justify-content: center;

  z-index: 999;
`;

type ModalContentProps = {
  hasBorder: boolean;
  width?: string;
  marginBottom?: string;
  padding?: string;
};

export const ModalContent = styled.div<ModalContentProps>`
  position: relative;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadiusLg};
  ${({ hasBorder }) => hasBorder && "border: 1px solid rgb(0 0 0 / 0.1);"}
  box-shadow: 0 2px 8px 4px rgb(0 0 0 / 0.08), 0 4px 1px -4px rgb(0 0 0 / 0.1);

  padding: ${({ padding }) => padding || "1.25rem"};
  width: ${({ width }) => width || "500px"};
  margin-bottom: ${({ marginBottom }) => marginBottom || 0};
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 0.8rem;
`;

export const Description = styled.div`
  color: ${({ color, theme }) => color || theme.grayColor};
`;
