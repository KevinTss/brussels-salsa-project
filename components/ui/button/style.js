import styled, { keyframes, css } from 'styled-components';

import { Icon } from '../icon/style';

const spin = keyframes`
  100% { transform: rotate(360deg) }
`;

export const ButtonBase = styled.button`
  font-size: 16px;
  line-height: 125%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  background: none;
  border: none;

  > ${Icon} {
    margin-right: ${({ $hasMarginRight }) => ($hasMarginRight ? '5px' : '0')};
    animation: ${({ $isLoading }) =>
      $isLoading
        ? css`
            ${spin} 1s linear infinite
          `
        : 'none'};
  }
`;

export const ButtonDefault = styled(ButtonBase)``;

export const ButtonPrimary = styled(ButtonBase)`
  border: 1px solid ${({ theme }) => theme.color.primary};
  color: white;
  background-color: ${({ theme }) => theme.color.primary};

  &:hover {
    ${({ $isDisabled }) => {
      if (!$isDisabled) return `color: ${({ theme }) => theme.color.primary};`;
    }}
  }
`;

export const ButtonMinimal = styled(ButtonBase)`
  color: ${({ theme }) => theme.color.primary};

  &:hover {
    text-decoration: underline;
  }
`;
