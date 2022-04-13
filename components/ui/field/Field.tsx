import type { ChangeEvent } from 'react';
import { Field, ErrorContainer } from './style';
import Label from '../label';
import Input from '../input';
import { Text } from '../../../styles/GlobalStyle';

type Props = {
  description?: string;
  error?: string;
  id?: string;
  isRequired?: boolean;
  label?: string;
  name?: string;
  onBlur?: () => void;
  onChange?: (e: any) => void;
  placeholder?: string;
  touched?: boolean;
  type: string;
  value?: any;
  options?: any;
};

const FieldEl = ({
  description,
  error,
  id,
  isRequired = false,
  label,
  name,
  onBlur,
  onChange,
  touched,
  type,
  value,
  ...props
}: Props) => (
  <Field>
    {label && (
      <Label htmlFor={name} isRequired={isRequired}>
        {label}
      </Label>
    )}
    {description && <Text>{description}</Text>}
    <Input
      id={id || name}
      name={name}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      {...props}
    />
    {error && touched ? <ErrorContainer>{error}</ErrorContainer> : null}
  </Field>
);

FieldEl.defaultProps = {
  isRequired: false,
};

export default FieldEl;
