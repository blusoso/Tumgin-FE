import styled from "styled-components";

type BaseAvatarWrapperType = {
  size: string;
  img: string;
  borderRadius: string;
};

export const BaseAvatarWrapper = styled.div<BaseAvatarWrapperType>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius || theme.borderRadiusLg};

  background-image: ${({ img }) => `url("${img}")`};
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
