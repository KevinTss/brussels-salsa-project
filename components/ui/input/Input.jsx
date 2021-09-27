import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import { InputContainer, Input } from './style'
import Icon from '../icon'
import Textarea from '../textarea'
import Select from '../select'

const InputEl = forwardRef(({ iconLeft, type, ...props }, ref) => {
  const extraProps = {}
  let InputComponent = Input
  if (type === 'textarea') {
    InputComponent = Textarea
    extraProps.hasBorder = false
  } else if (type === 'select') {
    InputComponent = Select
  }

  return (
    <InputContainer>
      {iconLeft && <Icon name={iconLeft} />}
      <InputComponent {...props} {...extraProps} type={type} ref={ref} />
    </InputContainer>
  )
})

InputEl.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'textarea',
    'select',
    'number',
    'tel',
  ]),
  size: PropTypes.oneOf(['s', 'm']),
}

InputEl.defaultProps = {
  size: 'm',
}

export default InputEl
