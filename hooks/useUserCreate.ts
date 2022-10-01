import { useMutation } from 'react-query';

import { NewUser } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

export const useUserCreate = () => {
  const { mutateAsync, isLoading } = useMutation(
    (data: NewUser) =>
      new Promise(async (resolve, reject) => {
        try {
          await fireStore.addDoc(
            fireStore.collection(fireStore.getFirestore(), 'users'),
            data
          );

          resolve({
            ok: true,
          });
        } catch (e) {
          console.warn(e);
          reject('Could not create user');
        }
      })
  );

  return {
    create: mutateAsync,
    isLoading,
  };
};
