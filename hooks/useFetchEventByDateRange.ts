import { ClasseEvent, Dayjs } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

// TODO: clarify if this is required
const useFetchEventByDateRange = () => {
  type fetchParams = {
    dateFrom: Dayjs;
    dateTo: Dayjs;
    classId: string;
  };

  const fetch = ({ dateFrom, dateTo, classId }: fetchParams) =>
    new Promise<ClasseEvent | null>((resolve, reject) => {
      const eventQuery = fireStore.query(
        fireStore.collection(fireStoreInstance, 'events'),
        fireStore.where('classId', '==', classId),
        fireStore.where('date', '>=', dateFrom.toDate()),
        fireStore.where('date', '<', dateTo.toDate())
      );

      fireStore
        .getDocs(eventQuery)
        .then((docSnap) => {
          console.log('coucou', docSnap);
          // TODO: finish this function
          resolve(null);
        })
        .catch((error) => {
          reject(error.message);
        });
    });

  return {
    fetch,
  };
};

export default useFetchEventByDateRange;
