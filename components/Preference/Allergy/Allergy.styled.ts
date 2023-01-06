import { HideScrollBar } from "@/components/Mixin/Mixin";
import styled from "styled-components";

export const AllergyList = styled(HideScrollBar)`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  max-height: 19rem;
`;

type AllergyCustomizeSectionProps = {
  isDesktop: boolean;
};

export const AllergyCustomizeSection = styled.div<AllergyCustomizeSectionProps>`
  ${({ isDesktop }) =>
    !isDesktop && "position: absolute; left: 0; bottom: 6.5rem;"}
  width: 100%;
  background-color: #fff;
`;
