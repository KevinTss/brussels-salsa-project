import { useContext } from 'react';

import { UsersContext } from '../contexts';
import { UsersContext as UsersContextType, User, NewUserData } from '../types';

export const useUsers = () => {
  const data = useContext<UsersContextType>(UsersContext);

  const typedData: UsersContextType = {
    add: data?.add || (() => {}),
    edit: data?.edit || (() => {}),
    getById: data?.getById || (() => {}),
    getAll: data?.getAll || (() => {}),
    create: data?.create || (() => {}),
    list: data.list,
  };

  return typedData;
};
