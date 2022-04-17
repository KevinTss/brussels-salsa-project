import { FieldGroup, Content, LabelContainer, LabelAppend } from './style';
import Label from '../label';

const FieldGroupEl = ({ children, label, labelAppend }) => (
  <FieldGroup>
    {!!label && (
      <LabelContainer>
        <Label>{label}</Label>
        {!!labelAppend && <LabelAppend>{labelAppend}</LabelAppend>}
      </LabelContainer>
    )}
    <Content>{children}</Content>
  </FieldGroup>
);

export default FieldGroupEl;
