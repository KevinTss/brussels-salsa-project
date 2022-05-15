import { useEffect, useState } from 'react';
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text
} from '@chakra-ui/react';
import { FaEllipsisV } from 'react-icons/fa'

import { useUsers } from '../../../hooks';
import {
  UsersContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from './style';
import { User, ClasseLevel } from '../../../types';
import UserForm from '../user-form'

export default function UsersList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { getAll, list, edit } = useUsers();

  useEffect(() => {
    if (!list.length) {
      getAll();
    }
  }, [getAll, list]);

  return (
    <>
      <UsersContainer>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Dancer</Th>
                <Th>Level</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {list.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    {user.fullName}
                    <br />
                    {user.email}
                  </Td>
                  <Td>-</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} variant='ghost'>
                        <FaEllipsisV />
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => setSelectedUser(user)}  >
                          Manage level
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </UsersContainer>
      <Drawer onClose={() => setSelectedUser(null)} isOpen={!!selectedUser} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Text as='p'>
              {`Edit `}<Text as='span' fontWeight='bold'>{selectedUser?.fullName}</Text>{`'s classe levels`}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <UserForm
              defaultValues={{
                salsaLevel: (selectedUser?.levels?.salsa ||
                  ClasseLevel.BEGINNER) as ClasseLevel,
                bachataLevel: (selectedUser?.levels?.bachata ||
                  ClasseLevel.BEGINNER) as ClasseLevel,
              }}
              onSubmit={(values) => {
                if (selectedUser?.id) {
                  edit(selectedUser.id, {
                    levels: {
                      salsa: values.salsaLevel,
                      bachata: values.bachataLevel,
                    },
                  });
                  setSelectedUser(null);
                  getAll();
                }
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
