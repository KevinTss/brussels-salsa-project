import styled from 'styled-components';

import { Icon } from '../icon/style';

const getSize = (size = 'm') =>
  ({
    m: '11.5px',
    s: '6px',
  }[size]);

export const InputContainer = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
  align-items: center;
  width: 100%;

  > ${Icon} {
    margin: 0 0 0 10px;
  }
`;

export const Input = styled.input<{ size: string; isDisabled: boolean }>`
  padding: ${({ size }) => getSize(size)};
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  width: 100%;
  opacity: ${({ isDisabled }) => (isDisabled ? '0.8' : '1')};
  font-family: ${({ theme }) => theme.fontFamily.default};
  font-size: 16px;
`;
