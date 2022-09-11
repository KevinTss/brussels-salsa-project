import { useMutation } from 'react-query';

import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

export const useLinkUsersDelete = () => {
  const { mutateAsync, isLoading } = useMutation(
    (linkedUserId: string) =>
      new Promise(async (resolve, reject) => {
        try {
          const docRef = fireStore.doc(
            fireStoreInstance,
            'linked-users',
            linkedUserId
          );

          await fireStore.deleteDoc(docRef);

          resolve({
            ok: true,
          });
        } catch (e) {
          console.warn(e);
          reject('Could not delete link');
        }
      })
  );

  return {
    delete: mutateAsync,
    isLoading,
  };
};
