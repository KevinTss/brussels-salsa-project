import { forwardRef } from 'react';

import { InputContainer, Input } from './style';
import Icon from '../icon';
import Textarea from '../textarea';
import Select from '../select';

type InputProps = {
  iconLeft?: string;
  type?: string;
  name?: string;
  id?: string;
  defaultValue?: any;
  isDisabled?: any;
  value?: any;
  options?: any;
  onChange?: (any: any) => void;
  onBlur?: (any: any) => void;
};

export default forwardRef<JSX.Element, InputProps>(
  ({ iconLeft, type, ...props }, ref) => {
    const extraProps: any = {};
    let InputComponent: any = Input;
    if (type === 'textarea') {
      InputComponent = Textarea;
      extraProps.hasBorder = false;
    } else if (type === 'select') {
      InputComponent = Select;
    }

    return (
      <InputContainer>
        {iconLeft && <Icon name={iconLeft} />}
        <InputComponent {...props} {...extraProps} type={type} ref={ref} />
      </InputContainer>
    );
  }
);
