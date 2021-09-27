import styled from 'styled-components';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 100%;

  > label {
    margin-bottom: 10px;
  }
`;

export const ErrorContainer = styled.span`
  color: #f56c6c;
  font-size: 12px;
  padding-top: 5px;
`;
