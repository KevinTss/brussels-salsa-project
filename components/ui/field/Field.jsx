import { Field, ErrorContainer } from './style'
import Label from '../label'
import Input from '../input'

const FieldEl = ({
  label,
  name,
  id,
  type,
  onChange,
  onBlur,
  value,
  error,
  touched,
  isRequired,
  ...props
}) => (
  <Field>
    {label && (
      <Label htmlFor={name} isRequired={isRequired}>
        {label}
      </Label>
    )}
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
)

FieldEl.defaultProps = {
  isRequired: false,
}

export default FieldEl
