import styled from 'styled-components';

export const Main = styled.main`
  flex: 1;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  border-radius: 25px;
  padding: 25px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadow.default};

  h2 {
    text-align: center;
    margin-bottom: 30px;
  }
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: rgba(255, 255, 255, 0);
  padding: 15px;
  border-radius: 8px;
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.fontSize.m};
  cursor: pointer;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background-color: rgba(0, 0, 0, 0.05);
  }

  > div {
    margin-right: 10px !important;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.fontSize.s};
  margin-top: 10px;
`;

export const OrSeparation = styled.p`
  width: 50%;
  text-align: center;
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.fontSize.m};
  margin: 20px auto;
  position: relative;
`;
