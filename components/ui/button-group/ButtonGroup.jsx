import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './style'

const ButtonGroupEl = ({ children, spaced }) => {
  return <Container spaced={spaced}>{children}</Container>
}

ButtonGroupEl.propTypes = {
  children: PropTypes.node.isRequired,
  spaced: PropTypes.bool,
}

ButtonGroupEl.defaultPros = {
  spaced: false,
}

export default ButtonGroupEl
