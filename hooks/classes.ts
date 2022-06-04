import { useContext } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ClassesContext } from '../contexts';
import { ClassesContext as ClassesContextType, Classe } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

export const useClasses = () => {
  const { data: classesList, isLoading } = useQuery(
    'classesList',
    () =>
      new Promise((resolve, reject) => {
        try {
          console.info('fetch classes');
          const query = fireStore.query(
            fireStore.collection(fireStore.getFirestore(), 'classes')
          );
          const unsubscribe = fireStore.onSnapshot(query, (querySnapshot) => {
            const classes: Classe[] = [];
            querySnapshot.forEach((doc) => {
              classes.push({
                id: doc.id,
                ...doc.data(),
              } as Classe);
            });
            console.group();
            console.info('Classes fetched');
            console.info('Data', classes);
            console.groupEnd();
            resolve(classes);
          });

          return unsubscribe;
        } catch (e) {
          console.warn(e);
          reject('Could not fetch classes');
        }
      })
  );
  // const data = useContext<ClassesContextType>(ClassesContext);

  // const typedData: ClassesContextType = {
  //   add: data?.add || (() => new Promise(() => {})),
  //   edit: data?.edit || (() => new Promise(() => {})),
  //   deleteById: data?.deleteById || (() => new Promise(() => {})),
  //   getById: data?.getById || ((id: string) => null),
  //   list: data?.list || [],
  //   loading: data?.loading || false,
  // };

  const add = (data) => {
    console.log('add classe', data);
  };
  const edit = (data) => {
    console.log('add classe', data);
  };
  const deleteById = (data) => {
    console.log('add classe', data);
  };
  const getById = (data) => {
    console.log('add classe', data);
  };

  return {
    list: (classesList as Classe[]) || [],
    isLoading,
    add,
    edit,
    deleteById,
    getById,
  };
};
