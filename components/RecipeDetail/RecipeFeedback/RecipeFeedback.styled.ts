import styled from "styled-components";

export const VerticalLine = styled.div`
  position: relative;
  border-right: 1px solid ${({ theme }) => theme.lightGrayColor};
  height: 100%;
  width: 50%;
  -ms-transform: translate(55%, 0);
  transform: translate(55%, 0);
  z-index: -1;
`;
