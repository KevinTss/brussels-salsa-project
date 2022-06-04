import { useQuery } from 'react-query';

import { Classe, WeekDay } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();
const classesCollectionRef = fireStore.collection(fireStoreInstance, 'classes');
const getDocs = fireStore.getDocs;

type useDayClassesParams = {
  day: WeekDay;
};

export const useDayClasses = ({ day }: useDayClassesParams) => {
  const { data, isLoading } = useQuery<Classe[], Error>(
    ['dayClassesList', day],
    () =>
      new Promise(async (resolve, reject) => {
        try {
          const query = fireStore.query(
            classesCollectionRef,
            fireStore.where('day', '==', day),
            fireStore.where('isArchived', '==', false)
          );

          const querySnapshot = await getDocs(query);

          const classesFetched: Classe[] = [];
          querySnapshot.forEach((doc) => {
            classesFetched.push({
              id: doc.id,
              ...doc.data(),
            } as Classe);
          });

          console.group();
          console.info('Day Classes Fetched');
          console.info('day', day);
          console.info('data', classesFetched);
          console.groupEnd();

          resolve(classesFetched);
        } catch (e) {
          console.warn(e);
          reject('Could not fetch classes');
        }
      }),
    {
      enabled: !!day,
    }
  );

  return {
    list: data || [],
    isLoading,
  };
};
