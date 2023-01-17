import { motion } from "framer-motion";
import styled from "styled-components";

export const ImageCarouselButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translate(0, -50%);
`;

export const ImageCarouselButton = styled(motion.button)`
  color: white;
  background-color: ${({ theme }) => theme.greenColor};
  border-radius: 100%;
  width: 3rem;
  height: 3rem;

  svg {
    display: inline;
  }
`;
