import { FC } from 'react'
import { Heading, Button, Text, useDisclosure } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'

import CreateClasseDrawer from '../create-classe-drawer'
import { Container } from './styles'
import { Row } from '../../../styles'

const ClasseAdminCockpit: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Container>
      <Row>
        <Heading>Recurring classes</Heading>
        <Button
          variant='ghost'
          onClick={onOpen}
          leftIcon={<FaPlus />}
        >
          Create
        </Button>
      </Row>
      <Row mt="16px">
        <Text fontSize='sm'>
          Recurring classes are representing moment which could contain a classe event, so all events in that classe will have that properties (Day of the week, spots, hour,...).
        </Text>
      </Row>
      <CreateClasseDrawer
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  )
}

export default ClasseAdminCockpit
