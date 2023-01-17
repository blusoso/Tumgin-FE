import styled from "styled-components";

type CopyButtonStyleProps = {
  size?: string;
  padding: string;
};

export const CopyButtonStyle = styled.button<CopyButtonStyleProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  padding: ${({ padding }) => padding};
  border: 1px solid ${({ theme }) => theme.greenColor};
  border-radius: 100%;
`;
