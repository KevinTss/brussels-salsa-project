import styled from 'styled-components';

import { InputContainer } from '../../ui/input/style';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 40px 0 200px 0;

  ${InputContainer} {
    margin: 10px 0 30px 0;
  }
`;
