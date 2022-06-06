import { useQuery } from 'react-query';

import { ClasseEvent, Dayjs } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

type useEventsParams = {
  dateFrom: Dayjs;
  dateTo: Dayjs;
  classeIds: string[];
};

export const useEvents = ({ dateFrom, dateTo, classeIds }: useEventsParams) => {
  const { data, isLoading, refetch } = useQuery<ClasseEvent[], Error>(
    ['eventsList', dateFrom.toDate(), dateTo.toDate()],
    () =>
      new Promise((resolve, reject) => {
        try {
          const eventQuery = fireStore.query(
            fireStore.collection(fireStoreInstance, 'events'),
            fireStore.where('date', '>=', dateFrom.toDate()),
            fireStore.where('date', '<', dateTo.toDate()),
            fireStore.where('classId', 'in', classeIds)
          );

          fireStore.onSnapshot(eventQuery, (querySnapshot) => {
            const result: ClasseEvent[] = [];
            querySnapshot.forEach((doc) => {
              result.push({
                id: doc.id,
                ...doc.data(),
              } as ClasseEvent);
            });

            console.group();
            console.info('Events fetched');
            console.info('Date from:', dateFrom.toDate());
            console.info('Date to:', dateTo.toDate());
            console.info('Classes ids', classeIds);
            console.info('Data', result);
            console.groupEnd();

            resolve(result);
          });
        } catch (e) {
          console.warn(e);
          reject('Could not fetch Events');
        }
      }),
    {
      enabled: !!dateFrom && !!dateTo && !!classeIds.length,
    }
  );

  return {
    list: data || [],
    isLoading,
    refetch,
  };
};
