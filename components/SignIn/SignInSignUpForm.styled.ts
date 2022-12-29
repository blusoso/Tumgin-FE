import styled from "styled-components";

export const ErrorMessageStyle = styled.div`
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.redColor};
  margin-top: 0.2rem;
  text-align: left;
  padding-left: 1rem;
`;
