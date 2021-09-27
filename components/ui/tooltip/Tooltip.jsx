import { useState } from 'react'
import PropTypes from 'prop-types'

import { Tooltip, LabelContent } from './style'

const TooltipEl = ({ children, label, size }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Tooltip
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <LabelContent size={size} isVisible={isOpen}>
        {label}
      </LabelContent>
      {children}
    </Tooltip>
  )
}

TooltipEl.propsTypes = {
  size: PropTypes.oneOf(['default', 'l']),
}

TooltipEl.defaultProps = {
  size: 'default',
}

export default TooltipEl
