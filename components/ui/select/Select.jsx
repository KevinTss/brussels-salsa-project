import Select from 'react-select';

import { reactSelectStyles } from './style';

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
  );
};

SelectEl.defaultProps = {
  isLoading: false,
  isSearchable: false,
};

export default SelectEl;
