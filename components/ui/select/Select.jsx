import Select from 'react-select'
import PropTypes from 'prop-types'

import { reactSelectStyles } from './style'

const SelectEl = ({
  options,
  value,
  isLoading,
  onChange,
  isSearchable,
  ...props
}) => {
  return (
    <Select
      isLoading={isLoading}
      isSearchable={isSearchable}
      onChange={onChange}
      options={options}
      styles={reactSelectStyles}
      value={value}
      {...props}
    />
  )
}

SelectEl.propTypes = {
  isLoading: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.any,
}

SelectEl.defaultProps = {
  isLoading: false,
  isSearchable: false,
}

export default SelectEl
