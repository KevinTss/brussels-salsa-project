import { FC } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Heading,
  Button,
  ButtonGroup
} from '@chakra-ui/react'
import { useFormik } from 'formik';

import { NewClasse, ClasseFrequency, ClasseLevel, WeekDay, ClasseType, User } from '../../../types'
import { useClasseCreate, useAuth, useClasses } from '../../../hooks'
import ClasseCreateForm from '../create-form'
import { classeFormSchema } from '../../../utils'

type Props = {
  isOpen: boolean,
  onClose: () => void
}

type FormData = {
  baseSpots: number;
  hour: string;
  level: ClasseLevel;
  maxSpots: number;
  min: string;
  type: ClasseType;
  weekDay: WeekDay;
};

const NewClasseDrawer: FC<Props> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { refetch } = useClasses()
  const { create } = useClasseCreate()
  const {
    handleChange,
    values,
    setFieldValue,
    submitForm,
    errors
  } = useFormik<FormData>({
    initialValues: {
      baseSpots: 10,
      hour: '19',
      level: ClasseLevel.BEGINNER,
      maxSpots: 99,
      min: '30',
      type: ClasseType.SALSA,
      weekDay: WeekDay.MONDAY,
    },
    validationSchema: classeFormSchema,
    onSubmit: async (values, { resetForm }) => {
      const objectToSend: NewClasse = {
        day: values.weekDay,
        frequency: ClasseFrequency.WEEKLY,
        level: values.level,
        spots: {
          base: values.baseSpots,
          max: values.maxSpots,
        },
        time: `${values.hour}:${values.min}`,
        type: values.type,
        balanceOffset: 1,
        isArchived: false
      };
      await create({
        admin: currentUser as User,
        data: objectToSend
      });
      resetForm();
      onClose()
      refetch()
    },
  })


  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent overflowY="auto">
        <DrawerHeader position="sticky" top="0" zIndex="10" background="white">
          <Heading size='lg'>Create a new recurring class</Heading>
        </DrawerHeader>
        <DrawerBody
          display="flex"
          flexDirection="column"
          gap="16px"
          overflow="visible"
          paddingBottom="300px"
          zIndex="9"
        >
          <ClasseCreateForm
            errors={errors}
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        </DrawerBody>
        <DrawerFooter position="sticky" bottom="0" zIndex="9" background="white">
          <ButtonGroup>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
            <Button onClick={submitForm}>Submit</Button>
          </ButtonGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default NewClasseDrawer
