import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  margin: 50px 0;
  border-collapse: collapse;
`;

export const THead = styled.thead``;

export const TH = styled.th<{ right?: boolean }>`
  text-align: ${({ right = false }) => (right ? 'right' : 'left')};
  font-size: 22px;
`;

export const TBody = styled.tbody``;

export const TR = styled.tr`
  &:hover {
    background: #00000005;
  }
`;

export const TD = styled.td`
  padding: 0 20px;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;

export const MenuContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
`;
