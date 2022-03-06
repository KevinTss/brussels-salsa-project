import { useFormik } from 'formik';

import { useClasses } from '../../../hooks';
import { Input, Label, Button, Field, FieldGroup } from '../../ui';
import { Form } from './style';
import { Text } from '../../../styles/GlobalStyle';
import {
  ClasseTypeEnum,
  ClasseFrequencyEnum,
  ClasseLevelEnum,
  NewClasseData,
  WeekDayEnum,
} from '../../../types';

const levelOptions = Object.values(ClasseLevelEnum).map((key) => ({
  value: key,
  label: key.toLowerCase(),
}));
const hourOptions = [...Array(24).keys()].map((i) => ({
  value: i.toString().padStart(2, '0'),
  label: i.toString().padStart(2, '0') + 'h',
}));
const minuteOptions = [
  { value: '30', label: '30' },
  { value: '00', label: '00' },
];
const weekDayOptions = Object.values(WeekDayEnum).map((key) => ({
  value: key,
  label: key.toLowerCase(),
}));
const typeOptions = Object.values(ClasseTypeEnum).map((key) => ({
  value: key,
  label: key.toLowerCase(),
}));

type ClassForm = {
  onClose: () => void;
  defaultValues?: any;
};

type FormData = {
  baseSpots: number;
  frequency: ClasseFrequencyEnum;
  hour: string;
  level: ClasseLevelEnum;
  maxSpots: number;
  min: string;
  type: ClasseTypeEnum;
  weekDay: WeekDayEnum;
};

export default function ClassForm({ onClose, defaultValues }: ClassForm) {
  const { add, edit } = useClasses();
  const { handleSubmit, handleChange, values, setFieldValue } =
    useFormik<FormData>({
      initialValues: {
        frequency: defaultValues
          ? defaultValues.frequency
          : ClasseFrequencyEnum.WEEKLY,
        baseSpots: defaultValues ? defaultValues.spots.base : 10,
        maxSpots: defaultValues ? defaultValues.spots.max : 99,
        hour: defaultValues ? defaultValues.time.split(':')[0] : '19',
        min: defaultValues ? defaultValues.time.split(':')[1] : '30',
        level: defaultValues ? defaultValues.level : ClasseLevelEnum.BEGINNER,
        weekDay: defaultValues ? defaultValues.weekDay : WeekDayEnum.MONDAY,
        type: defaultValues ? defaultValues.type : ClasseTypeEnum.SALSA,
      },
      onSubmit: async (values, { resetForm }) => {
        const objectToSend: NewClasseData = {
          day: values.weekDay,
          frequency: values.frequency,
          level: values.level,
          spots: {
            base: values.baseSpots,
            max: values.maxSpots,
          },
          time: `${values.hour}:${values.min}`,
          type: ClasseTypeEnum.SALSA,
        };
        console.log('objectToSend', objectToSend);
        if (!!defaultValues) {
          await edit(defaultValues.id, objectToSend);
        } else {
          await add(objectToSend);
        }
        resetForm();
        onClose();
      },
      enableReinitialize: true,
    });
  // console.log('levelOptions', levelOptions);
  // console.log('typeOptions', typeOptions);
  console.log('values', values);
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='type'>Type of class</Label>
      <Input
        type='select'
        name='type'
        id='type'
        onChange={(option: { value: ClasseTypeEnum }) => {
          setFieldValue('type', option.value);
        }}
        defaultValue={values.type}
        value={typeOptions.find(({ value }) => value === values.type)}
        options={typeOptions}
      />
      <Label htmlFor='frequency'>Frequency</Label>
      <Text>For now the frequency is blocked at `Weekly`</Text>
      <Input
        type='select'
        name='frequency'
        id='frequency'
        onChange={(option: { value: ClasseFrequencyEnum }) => {
          setFieldValue('frequency', option.value);
        }}
        defaultValue={values.frequency}
        value={{ value: 'weekly', label: 'Every week' }}
        isDisabled
        options={[{ value: ClasseFrequencyEnum.WEEKLY, label: 'Every week' }]}
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
        onChange={(option: { value: ClasseLevelEnum }) =>
          setFieldValue('level', option.value)
        }
        value={levelOptions.find(({ value }) => value === values.level)}
        options={levelOptions}
      />
      <FieldGroup label='Time' labelAppend={undefined}>
        <Field
          type='select'
          name='hour'
          id='hour'
          onChange={(option: { value: string }) =>
            setFieldValue('hour', option.value)
          }
          options={hourOptions}
          value={
            hourOptions[
              hourOptions.findIndex(({ value }) => value === values.hour)
            ]
          }
          label={undefined}
          onBlur={undefined}
          error={undefined}
          touched={undefined}
          isRequired={undefined}
          description={undefined}
        />
        <Field
          type='select'
          name='min'
          id='min'
          onChange={(option: { value: string }) =>
            setFieldValue('min', option.value)
          }
          options={minuteOptions}
          value={
            minuteOptions[
              minuteOptions.findIndex(({ value }) => value === values.min)
            ]
          }
          label={undefined}
          description={undefined}
          onBlur={undefined}
          error={undefined}
          touched={undefined}
          isRequired={undefined}
        />
      </FieldGroup>
      <Field
        label='Day of the week'
        type='select'
        name='weekDay'
        id='weekDay'
        onChange={(option: { value: WeekDayEnum }) =>
          setFieldValue('weekDay', option.value)
        }
        options={weekDayOptions}
        value={weekDayOptions.find(({ value }) => value === values.weekDay)}
        onBlur={undefined}
        error={undefined}
        touched={undefined}
        description={`The class will occur every ${values?.weekDay?.toLowerCase()}`}
        isRequired={undefined}
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
