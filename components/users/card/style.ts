import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
