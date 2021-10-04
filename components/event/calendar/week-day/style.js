import styled from 'styled-components';

export const WeekDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 15px 45px 0 rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  padding: 20px;
  background-color: white;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
