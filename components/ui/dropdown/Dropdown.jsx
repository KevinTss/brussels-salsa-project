import React, { useState } from 'react'

import { Dropdown, Drawer } from './style'

const DropdownEl = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onKeyPress = ({ key }) => {
    if (key !== 'Enter') return
    setIsOpen(!isOpen)
  }

  return (
    <Dropdown
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      tabIndex={0}
      onKeyPress={onKeyPress}
    >
      {children}
      <Drawer isOpen={isOpen}>{content}</Drawer>
    </Dropdown>
  )
}

export default DropdownEl
