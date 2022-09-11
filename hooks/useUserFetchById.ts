import { User } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

export const useUserFetchById = () => {
  const fetch = (userId: string) =>
    new Promise<User | null>((resolve, reject) => {
      const docRef = fireStore.doc(fireStoreInstance, 'users', userId);
      fireStore
        .getDoc(docRef)
        .then((docSnap) => {
          resolve(
            docSnap.exists()
              ? ({ id: userId, ...docSnap.data() } as User)
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
