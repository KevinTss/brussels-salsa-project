import styled from 'styled-components';

// import { BaseText } from '../../../style'

export const Label = styled.label`
  position: relative;
  margin-bottom: 8px;

  ${({ isRequired }) => {
    if (isRequired) {
      return `
        &:before {
          content: '*';
          position: absolute;
          top; -5px;
          left: -9px;
          color: #f56c6c;
        }
      `;
    }
  }}
`;
