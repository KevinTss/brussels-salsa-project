import PropTypes from 'prop-types'

import { FieldGroup, Content, LabelContainer, LabelAppend } from './style'
import Label from '../label'

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
)

FieldGroupEl.propsTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  labelAppend: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
}

export default FieldGroupEl
