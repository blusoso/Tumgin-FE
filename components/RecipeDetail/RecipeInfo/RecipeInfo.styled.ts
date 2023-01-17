import styled from "styled-components";
import { motion } from "framer-motion";

export const DifficultLevelLabel = styled.p`
  color: ${({ theme }) => theme.grayColor};
`;

type RecipeImgsType = {
  backgroundImage: string;
  height: string;
};

export const RecipeImgs = styled(motion.div)<RecipeImgsType>`
  background: ${({ backgroundImage }) => `url("${backgroundImage}")`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: ${({ height }) => height || "100%"};

  border-radius: ${({ theme }) => theme.borderRadiusLg};
`;

export const NutritionCard = styled.div`
  background: ${({ theme }) => theme.lightGreenColor};
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.borderRadiusMd};
  text-align: center;
`;

export const StaffPickBadge = styled.div`
  position: absolute;
  top: 6%;
  left: 50%;
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);

  p {
    background: white;
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.borderRadiusSm};
    border: 1px solid ${({ theme }) => theme.greenColor};
    color: ${({ theme }) => theme.greenColor};
    font-size: 12px;
    font-weight: normal;
  }
`;
