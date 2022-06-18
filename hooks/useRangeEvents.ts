import { useQuery } from 'react-query';

import { ClasseEvent, Dayjs } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

type useRangeEventsParams = {
  dateFrom: Dayjs;
  dateTo: Dayjs;
};

export const useRangeEvents = ({ dateFrom, dateTo }: useRangeEventsParams) => {
  const { data, isLoading, refetch } = useQuery<ClasseEvent[], Error>(
    ['rangeEventsList', dateFrom.toString(), dateTo.toString()],
    () =>
      new Promise((resolve, reject) => {
        try {
          const eventQuery = fireStore.query(
            fireStore.collection(fireStoreInstance, 'events'),
            fireStore.where('date', '>=', dateFrom.toDate()),
            fireStore.where('date', '<', dateTo.toDate())
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
            console.info('Events range fetched');
            console.info('Date from:', dateFrom.toString());
            console.info('Date to:', dateTo.toString());
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
      enabled: !!dateFrom && !!dateTo,
    }
  );

  return {
    list: data || [],
    isLoading,
    refetch,
  };
};
