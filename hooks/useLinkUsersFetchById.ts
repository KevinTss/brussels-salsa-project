import { useQuery } from 'react-query';

import { User, LinkedUsers } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

type LinkedUserObject = {
  id: string;
} & LinkedUsers;

export const useLinkUsersFetchById = () => {
  const fetch = (user: User) =>
    new Promise<LinkedUserObject | null>((resolve, reject) => {
      const docRef = fireStore.doc(fireStoreInstance, 'linked-users', user.id);
      fireStore
        .getDoc(docRef)
        .then((docSnap) => {
          resolve(
            docSnap.exists()
              ? ({
                  id: docSnap.id,
                  ...docSnap.data(),
                } as LinkedUserObject)
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
