import { motion } from "framer-motion";
import styled from "styled-components";

export const SlideModalContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;

export const SlideModalContent = styled.div`
  background-color: white;
  padding: 1.5rem 1rem;
  border-top-left-radius: ${({ theme }) => theme.borderRadiusXl};
  border-top-right-radius: ${({ theme }) => theme.borderRadiusXl};
`;
