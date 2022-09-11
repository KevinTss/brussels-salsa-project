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

import { NewClasse, ClasseLevel, WeekDay, ClasseType, User, Classe } from '../../../types'
import { useClasseUpdate, useAuth, useClasses } from '../../../hooks'
import ClasseCreateForm from '../create-form'
import { getTimeFromClasse, classeFormSchema } from '../../../utils'

type Props = {
  isOpen: boolean,
  onClose: () => void,
  classe?: Classe
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

const UpdateClasseDrawer: FC<Props> = ({ isOpen, onClose, classe }) => {
  const { currentUser } = useAuth();
  const { refetch } = useClasses()
  const { update } = useClasseUpdate()
  const {
    handleChange,
    values,
    setFieldValue,
    submitForm,
    errors
  } = useFormik<FormData>({
    initialValues: {
      baseSpots: classe?.spots?.base || 10,
      hour: classe ? getTimeFromClasse(classe)[0] : '19',
      level: classe?.level || 0,
      maxSpots: classe?.spots.max || 99,
      min: classe ? getTimeFromClasse(classe)[1] : '00',
      type: classe?.type || ClasseType.SALSA,
      weekDay: classe?.day || WeekDay.MONDAY,
    },
    validationSchema: classeFormSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!classe) return

      const objectToSend: NewClasse = {
        day: values.weekDay,
        frequency: classe.frequency,
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
      await update({
        id: classe.id,
        admin: currentUser as User,
        data: objectToSend
      });
      resetForm();
      onClose()
      refetch()
    },
    enableReinitialize: true
  })


  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent overflowY="auto">
        <DrawerHeader position="sticky" top="0" zIndex="10" background="white">
          <Heading size='lg'>Update recurring class</Heading>
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

export default UpdateClasseDrawer
