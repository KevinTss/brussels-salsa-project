import { ClasseEvent } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

export const useFetchEvent = () => {
  const fetch = (eventId: string) =>
    new Promise<ClasseEvent | null>((resolve, reject) => {
      const docRef = fireStore.doc(fireStoreInstance, 'events', eventId);
      fireStore
        .getDoc(docRef)
        .then((docSnap) => {
          resolve(
            docSnap.exists()
              ? ({ id: eventId, ...docSnap.data() } as ClasseEvent)
              : null
          );
        })
        .catch((error) => {
          reject(error.message);
        });
    });

  return {
    fetch,
  };
};
