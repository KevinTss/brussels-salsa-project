import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ spaced }) => (spaced ? 'space-between' : 'flex-start')};

  > *:not(:last-child) {
    margin-right: 10px;
  }
`;
