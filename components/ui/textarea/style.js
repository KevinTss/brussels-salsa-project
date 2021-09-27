import styled from 'styled-components';

export const Textarea = styled.textarea`
  background-color: rgba(255, 255, 255, 0);
  border-radius: 3px;
  border: ${({ hasBorder }) => (hasBorder ? '1px solid #ddd' : 'none')};
  box-sizing: border-box;
  min-height: 200px;
  outline: none;
  padding: 10px;
  resize: none;
  width: 100%;
  font-family: ${({ theme }) => theme.fontFamily.default};
`;
