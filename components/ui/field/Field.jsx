import { Field, ErrorContainer } from './style'
import Label from '../label'
import Input from '../input'
import { Text } from '../../../styles/GlobalStyle';

const FieldEl = ({
  description,
  error,
  id,
  isRequired,
  label,
  name,
  onBlur,
  onChange,
  touched,
  type,
  value,
  ...props
}) => (
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
}

export default FieldEl
