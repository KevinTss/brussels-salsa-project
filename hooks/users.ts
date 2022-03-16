import { useContext } from 'react';

import { UsersContext } from '../contexts';
import { UsersContext as UsersContextType } from '../types';

export const useUsers = () => {
  const data = useContext<UsersContextType>(UsersContext);

  const typedData: UsersContextType = {
    add: data?.add || (() => {}),
    create: data?.create || (() => {}),
    edit: data?.edit || (() => {}),
    getAll: data?.getAll || (() => {}),
    getById: data?.getById || (() => {}),
    list: data.list,
  };

  return typedData;
};
