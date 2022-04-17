import React from 'react';

import { Container } from './style';

const ButtonGroupEl = ({ children, isVertical }) => {
  return <Container isVertical={isVertical}>{children}</Container>;
};

ButtonGroupEl.defaultPros = {
  isVertical: false,
};

export default ButtonGroupEl;
