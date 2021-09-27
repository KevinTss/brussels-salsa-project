import React from 'react'

import { Link } from './style'

const LinkEl = ({ isActive, ...props }) => (
  <Link $isActive={isActive} {...props} />
)

export default LinkEl
