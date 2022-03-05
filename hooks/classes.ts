import { useContext } from 'react';

import { ClassesContext } from '../contexts';
import { ClassesContext as ClassesContextType } from '../types';

export const useClasses = () => {
  const data = useContext(ClassesContext);

  const typedData: ClassesContextType = {
    list: data?.list || [],
    add: data?.add || (() => new Promise(() => {})),
    loading: data?.loading || false,
  };

  return typedData;
};
