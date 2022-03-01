import { useFormik } from 'formik';

import { useClasses } from '../../../hooks';
import { Input, Label, Button, Field, FieldGroup } from '../../ui';
import { Form } from './style';
import { Text } from '../../../styles/GlobalStyle';
import { djs } from '../../../utils';

const levelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'improver', label: 'Improver' },
];
const hourOptions = [...Array(24).keys()].map((i) => ({
  value: i.toString().padStart(2, '0'),
  label: i.toString().padStart(2, '0'),
}));
const minuteOptions = [
  { value: '30', label: '30' },
  { value: '00', label: '00' },
];
const weekDayOptions = djs.weekdays().map((day) => ({
  value: day.toLowerCase(),
  label: day,
}));

const CreateClassForm = ({ onClose }) => {
  const { add } = useClasses();
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      frequency: 'weekly',
      baseSpots: 10,
      maxSpots: 99,
      hour: '19',
      min: '30',
      level: 'beginner',
      weekDay: 'monday',
    },
    onSubmit: async (values) => {
      const objectToSend = {
        day: values.weekDay,
        frequency: values.frequency,
        level: values.level,
        spots: {
          base: values.baseSpots,
          max: values.maxSpots,
        },
        time: `${values.hour}:${values.min}`,
        type: 'salsa',
      };
      await add(objectToSend);
      onClose();
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='frequency'>Frequency</Label>
      <Text>For now the frequency is blocked at `Weekly`</Text>
      <Input
        type='select'
        name='frequency'
        id='frequency'
        onChange={(option) => {
          setFieldValue('frequency', option.value);
        }}
        defaultValue={values.frequency}
        value={{ value: 'weekly', label: 'Every week' }}
        isDisabled
        options={[
          { value: 'weekly', label: 'Every week' },
          // { value: 'monthly', label: 'Every month' },
        ]}
      />
      <Label htmlFor='baseSpots'>Base spots</Label>
      <Text>
        {
          "The amount of free spots where the balance won't be respected. Until the spot reached the dancers won't be able to join except the balance man/woman is respected (with a difference of 1)"
        }
      </Text>
      <Input
        id='baseSpots'
        name='baseSpots'
        type='number'
        onChange={handleChange}
        value={values.baseSpots}
      />
      <Label htmlFor='maxSpots'>Maximum spots</Label>
      <Text>
        You can specify a maximum of dancers per class (`99` by default)
      </Text>
      <Input
        id='maxSpots'
        name='maxSpots'
        type='number'
        onChange={handleChange}
        value={values.maxSpots}
      />
      <Label htmlFor='level'>Level</Label>
      <Input
        type='select'
        name='level'
        id='level'
        onChange={(option) => setFieldValue('level', option.value)}
        value={
          levelOptions[
            levelOptions.findIndex(({ value }) => value === values.level)
          ]
        }
        options={levelOptions}
      />
      <FieldGroup label='Time'>
        <Field
          type='select'
          name='hour'
          id='hour'
          onChange={(option) => setFieldValue('hour', option.value)}
          options={hourOptions}
          value={
            hourOptions[
              hourOptions.findIndex(({ value }) => value === values.hour)
            ]
          }
        />
        <Field
          type='select'
          name='min'
          id='min'
          onChange={(option) => setFieldValue('min', option.value)}
          options={minuteOptions}
          value={
            minuteOptions[
              minuteOptions.findIndex(({ value }) => value === values.min)
            ]
          }
        />
      </FieldGroup>
      <Field
        label='Day of the week'
        type='select'
        name='weekDay'
        id='weekDay'
        onChange={(option) => setFieldValue('weekDay', option.value)}
        options={weekDayOptions}
        value={
          weekDayOptions[
            weekDayOptions.findIndex(({ value }) => value === values.weekDay)
          ]
        }
      />
      <Button type='submit' appearance='primary'>
        Submit
      </Button>
    </Form>
  );
};

export default CreateClassForm;
