import { useContext } from 'react';

import { UsersContext } from '../contexts';

export const useUsers = () => useContext(UsersContext);
