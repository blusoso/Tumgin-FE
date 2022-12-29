import styled from "styled-components";

export const ReadMoreStyle = styled.span`
  text-transform: capitalize;
  cursor: pointer;

  span:last-child {
    padding-left: 3px;
    color: ${({ theme }) => theme.yellowColor};
  }
`;
