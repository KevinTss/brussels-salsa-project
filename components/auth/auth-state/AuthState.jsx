import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  MenuDivider,
} from '@chakra-ui/react';
import { FaPowerOff, FaCog } from 'react-icons/fa';
import Router from 'next/router';

import { useAuth } from '../../../hooks';
import { AuthStateContainer } from './style';
import { RoutePaths } from '../../../types';

const AuthState = () => {
  const { currentUser, isLoading, logout } = useAuth();

  if (isLoading || !currentUser) return null;

  return (
    <AuthStateContainer>
      <Menu>
        <MenuButton as={Button} variant='ghost'>
          <Avatar
            size='sm'
            name={currentUser.fullName}
            src={currentUser.avatarUrl || undefined}
          />
        </MenuButton>
        <MenuList>
          {!!currentUser.isAdmin && (
            <>
              <MenuItem onClick={() => Router.push(RoutePaths.ADMIN_CALENDAR)}>
                Admin
              </MenuItem>
              <MenuDivider />
            </>
          )}
          {/* <MenuItem
            onClick={() => Router.push(RoutePaths.SETTINGS)}
            icon={<FaCog />}
          >
            Settings
          </MenuItem> */}
          <MenuItem onClick={logout} icon={<FaPowerOff />}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </AuthStateContainer>
  );
};

export default AuthState;
