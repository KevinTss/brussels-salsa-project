import React from 'react'

import { NavLink } from './style'

const NavLinkEl = ({ isActive, ...props }) => (
  <NavLink $isActive={isActive} {...props} />
)

export default NavLinkEl
