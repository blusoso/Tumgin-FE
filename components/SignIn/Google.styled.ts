import styled from "styled-components";

export const GoogleLoginStyle = styled.div`
  button {
    width: 100%;
    color: ${({ theme }) => theme.blackColor};
    font-family: "Mitr";
    border: 1px solid ${({ theme }) => theme.lightGrayColor};
    border-radius: ${({ theme }) => theme.borderRadiusSm};
    box-shadow: none;
    justify-content: center;

    div {
      padding: 5px;
      margin-right: 0.4rem;
    }

    span {
      font-weight: 400;
    }
  }
`;

export const GoogleLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.3rem;
  border: 1px solid ${({ theme }) => theme.lightGrayColor};
  border-radius: ${({ theme }) => theme.borderRadiusSm};
  font-weight: 400;
`;
