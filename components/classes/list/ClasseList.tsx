import { FC, useState } from 'react'
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
} from '@chakra-ui/react';
import { FaEllipsisV, FaPen } from 'react-icons/fa'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '../../users/list/style';
import { Container } from './styles'
import { useClasses } from '../../../hooks'
import { Classe } from '../../../types';
import UpdateClasseDrawer from '../update-classe-drawer'
import { getClassesSortedByDayAndTime, capitalize } from '../../../utils'

const ClasseList: FC = () => {
  const { list } = useClasses()
  const [selectedClasse, setSelectedClasse] = useState<Classe | undefined>(undefined)

  const sortedList = getClassesSortedByDayAndTime(list)

  return (
    <Container>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Day</Th>
              <Th>Time</Th>
              <Th>Type</Th>
              <Th>Frequency</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedList?.map((classe) => (
              <Tr key={classe.id}>
                <Td>
                  {capitalize(classe.day)}
                </Td>
                <Td>
                  {classe.time}
                </Td>
                <Td>
                  {capitalize(classe.type)}
                </Td>
                <Td>
                  {capitalize(classe.frequency)}
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} variant='ghost'>
                      <FaEllipsisV />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => setSelectedClasse(classe)}>
                        <FaPen />
                        &nbsp;
                        &nbsp;
                        {`Edit`}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <UpdateClasseDrawer
        isOpen={!!selectedClasse}
        onClose={() => setSelectedClasse(undefined)}
        classe={selectedClasse}
      />
    </Container>
  )
}

export default ClasseList
