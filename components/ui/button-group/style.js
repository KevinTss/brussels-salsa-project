import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  ${({ isVertical }) =>
    isVertical ? `grid-template-rows: auto;` : `grid-template-columns: auto;`}
  gap: 10px;
  width: 100%;
`;
