import styled from "styled-components";

export const SavedReminderCard = styled.div`
  background-color: ${({ theme }) => theme.lightGreenColor};
  border-radius: ${({ theme }) => theme.borderRadiusLg};
  padding: 1.25rem 1rem;

  display: flex;
  align-items: center;
  gap: 0.875rem;
`;
