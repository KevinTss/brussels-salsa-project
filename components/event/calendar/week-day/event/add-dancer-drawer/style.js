import styled from 'styled-components';

export const DancersContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

export const FullNameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 5px;
  border-radius: 4px;

  &:hover {
    background: #00000020;
  }
`;
