import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const GenderButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.color.border};
  background-color: white;
  border-style: solid;
  border-width: 1px;
  padding: 20px;
  width: 120px;
  height: 120px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

export const GenderLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.default};
`;

export const EmojiContainer = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
