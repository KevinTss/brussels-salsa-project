import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style';

const ButtonGroupEl = ({ children, isVertical }) => {
  return <Container isVertical={isVertical}>{children}</Container>;
};

ButtonGroupEl.propTypes = {
  children: PropTypes.node.isRequired,
  isVertical: PropTypes.bool,
};

ButtonGroupEl.defaultPros = {
  isVertical: false,
};

export default ButtonGroupEl;
