import styled, { keyframes, css } from 'styled-components';

import { Icon } from '../icon/style';

const spin = keyframes`
  100% { transform: rotate(360deg) }
`;

export const ButtonBase = styled.button`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamily.default};
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
    transform: ${({ $isIconReverse }) =>
      $isIconReverse ? 'rotate(180deg)' : 'rotate(0)'};
  }

  > ${Icon}[data-position="right"] {
    margin-left: 5px;
    margin-right: 0;
  }
`;

export const ButtonDefault = styled(ButtonBase)``;

export const ButtonPrimary = styled(ButtonBase)`
  border: 1px solid ${({ theme }) => theme.color.primary};
  color: white;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 8px;
  padding: 14px 24px;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary}aa;
    border: 1px solid ${({ theme }) => theme.color.primary}aa;

    ${({ $isDisabled }) => {
      if (!$isDisabled)
        return `color: ${({ theme }) => theme.color.primary}55;`;
    }}
  }
`;

export const ButtonMinimal = styled(ButtonBase)`
  border: 1px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.primary};
  border-radius: 8px;
  padding: 14px 24px;
  background-color: rgba(255, 255, 255, 0);

  &:hover {
    text-decoration: underline;
  }
`;
