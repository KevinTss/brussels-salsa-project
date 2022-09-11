import { FC, ChangeEvent } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage
} from '@chakra-ui/react'

import { Input } from '../../ui';
import { Row } from '../../../styles'
import {
  ClasseFrequency,
  ClasseLevel,
  WeekDay,
} from '../../../types';
import {
  levelOptions,
  typeOptions,
  weekDayOptions,
  hourOptions,
  minuteOptions
} from '../../../utils';

type Props = {
  values: any,
  errors: any,
  handleChange: (e: ChangeEvent<any>) => void,
  setFieldValue: (field: string, data: string | number) => void
}

const ClasseCreateForm: FC<Props> = ({ values, handleChange, setFieldValue, errors }) => {
  return (
    <>
      <FormControl isInvalid={false}>
        <FormLabel htmlFor='type'>Type of classe</FormLabel>
        <Input
          id='type'
          name='type'
          type='select'
          onChange={(option: { value: ClasseFrequency }) => {
            console.log('change', option)
            setFieldValue('type', option.value);
          }}
          value={typeOptions.find(({ value }) => value === values.type)}
          options={typeOptions}
        />
      </FormControl>

      <FormControl isInvalid={!!errors?.baseSpots}>
        <FormLabel htmlFor='baseSpots'>Base spots</FormLabel>
        <Input
          id='baseSpots'
          name='baseSpots'
          type='number'
          onChange={handleChange}
          value={values.baseSpots}
        />
        {!!errors?.baseSpots && <FormErrorMessage>{errors.baseSpots}</FormErrorMessage>}
        <FormHelperText>{`The amount of free spots where the balance won't be respected. Until the spot reached the dancers won't be able to join except the balance man/woman is respected (with a difference of 1)`}</FormHelperText>
      </FormControl>

      <FormControl isInvalid={!!errors?.maxSpots}>
        <FormLabel htmlFor='maxSpots'>Maximum spots</FormLabel>
        <Input
          id='maxSpots'
          type='number'
          name="maxSpots"
          onChange={handleChange}
          value={values.maxSpots}
        />
        {!!errors?.maxSpots && <FormErrorMessage>{errors.maxSpots}</FormErrorMessage>}
        <FormHelperText>{`You can specify a maximum of dancers per class ("99" by default)`}</FormHelperText>
      </FormControl>

      <FormControl isInvalid={false}>
        <FormLabel htmlFor='level'>Level required</FormLabel>
        <Input
          id='level'
          name="level"
          type='select'
          onChange={(option: { value: ClasseLevel }) =>
            setFieldValue('level', option.value)
          }
          value={levelOptions.find(({ value }) => value === values.level)}
          options={levelOptions}
        />
        <FormHelperText>{`If a student doesn't have the required level, he won't be able to join the class`}</FormHelperText>
      </FormControl>

      <Row>
        <FormControl isInvalid={false}>
          <FormLabel htmlFor='hour'>Time</FormLabel>
          <Input
            id='hour'
            type='select'
            name="hour"
            onChange={(option: { value: string }) =>
              setFieldValue('hour', option.value)
            }
            value={hourOptions[
              hourOptions.findIndex(({ value }) => value === values.hour)
            ]}
            options={hourOptions}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='min'>&nbsp;</FormLabel>
          <Input
            id='min'
            type='select'
            name="min"
            onChange={(option: { value: string }) =>
              setFieldValue('min', option.value)
            }
            value={minuteOptions[
              minuteOptions.findIndex(({ value }) => value === values.min)
            ]}
            options={minuteOptions}
          />
        </FormControl>
      </Row>

      <FormControl isInvalid={false}>
        <FormLabel htmlFor='weekDay'>Day of the week</FormLabel>
        <Input
          id='weekDay'
          name="weekDay"
          type='select'
          onChange={(option: { value: WeekDay }) =>
            setFieldValue('weekDay', option.value)
          }
          value={weekDayOptions.find(({ value }) => value === values.weekDay)}
          options={weekDayOptions}
        />
        <FormHelperText>{`The class will occur every ${values?.weekDay?.toLowerCase()}`}</FormHelperText>
      </FormControl>
    </>
  );
}

export default ClasseCreateForm
