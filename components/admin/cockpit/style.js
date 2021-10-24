import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 40px 0;
  border-bottom: 1px solid #ddd;
  flex-direction: column;
`;

export const CTAs = styled.div`
  display: flex;

  > *:not(:last-child) {
    margin-right: 10px;
  }
`;
