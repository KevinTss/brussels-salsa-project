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
  const { data: classesList } = useQuery(
    'classesList',
    () =>
      new Promise((resolve, reject) => {
        try {
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
            console.warn('Classes fetched');
            console.warn('Data', classes);
            console.groupEnd();
            // setList(classes);
            // setLoading(false);
            resolve(classes);
          });

          return unsubscribe;
        } catch (e) {
          console.warn(e);
          // setLoading(false);
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

  return {
    list: classesList,
  };
};
