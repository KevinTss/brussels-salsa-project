import styled from 'styled-components';

import { Field } from '../field/style';

export const FieldGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;

  > ${Field}:not(:last-child) {
    margin-right: 20px;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
`;

export const LabelAppend = styled.div`
  margin-left: 5px;
`;
