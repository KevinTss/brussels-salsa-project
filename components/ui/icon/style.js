import styled from 'styled-components';

export const Icon = styled.div`
  width: 14px;
  height: 14px;
  position: relative;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    fill: ${({ theme }) => theme.color.primary};
  }
`;
