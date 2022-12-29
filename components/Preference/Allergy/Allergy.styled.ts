import styled from "styled-components";

export const AllergyList = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  max-height: 19rem;
`;

export const AllergyFooter = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
`;

export const AllergyCustomizeSection = styled(AllergyFooter)`
  bottom: 6.5rem;
  background-color: #fff;
`;
