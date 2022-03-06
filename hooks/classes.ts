import { useContext } from 'react';

import { ClassesContext } from '../contexts';
import { ClassesContext as ClassesContextType } from '../types';

export const useClasses = () => {
  const data = useContext(ClassesContext);

  const typedData: ClassesContextType = {
    add: data?.add || (() => new Promise(() => {})),
    getById: data?.getById || ((id: string) => null),
    list: data?.list || [],
    loading: data?.loading || false,
  };

  return typedData;
};
