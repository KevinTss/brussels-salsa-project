import { useFormik } from 'formik';

import { Input, Label, Button } from '../../ui';
import { Form } from './style';
import { ClasseLevelEnum } from '../../../types';
import { levelOptions } from '../../../utils';

type FormData = {
  salsaLevel: ClasseLevelEnum;
  bachataLevel: ClasseLevelEnum;
};

type UserFormProps = {
  defaultValues?: FormData;
  onSubmit: (data: FormData) => void;
};

export default function UserForm({ defaultValues, onSubmit }: UserFormProps) {
  const { handleSubmit, values, setFieldValue } = useFormik<FormData>({
    initialValues: {
      salsaLevel: defaultValues?.salsaLevel || ClasseLevelEnum.BEGINNER,
      bachataLevel: defaultValues?.bachataLevel || ClasseLevelEnum.BEGINNER,
    },
    onSubmit(values, { resetForm }) {
      onSubmit(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='salsaLevel'>Salsa level</Label>
      <Input
        type='select'
        name='salsaLevel'
        id='salsaLevel'
        onChange={(option: { value: string }) => {
          setFieldValue('salsaLevel', option.value);
        }}
        value={levelOptions.find((item) => item.value === values.salsaLevel)}
        options={levelOptions}
      />
      <Label htmlFor='salsaLevel'>Bachata level</Label>
      <Input
        type='select'
        name='bachataLevel'
        id='bachataLevel'
        onChange={(option: { value: string }) => {
          setFieldValue('bachataLevel', option.value);
        }}
        value={levelOptions.find((item) => item.value === values.bachataLevel)}
        options={levelOptions}
      />
      <Button
        type='submit'
        appearance='primary'
        iconLeft={undefined}
        iconRight={undefined}
        isDisabled={undefined}
        isLoading={undefined}
        isIconReverse={undefined}
      >
        Submit
      </Button>
    </Form>
  );
}
