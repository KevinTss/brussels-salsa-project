import { useQuery } from 'react-query';

import { Classe } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

export const useClasses = () => {
  const {
    data: classesList,
    isLoading,
    refetch,
  } = useQuery(
    'classesList',
    () =>
      new Promise((resolve, reject) => {
        try {
          console.info('fetch classes');
          const query = fireStore.query(
            fireStore.collection(fireStore.getFirestore(), 'classes'),
            fireStore.where('isArchived', '!=', true)
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

  return {
    list: (classesList as Classe[]) || [],
    isLoading,
    refetch,
  };
};
