import { useMutation } from 'react-query';

import { User, NewClasse } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

type CreateParams = {
  admin: User;
  data: NewClasse;
};

export const useClasseCreate = () => {
  const { mutateAsync, isLoading } = useMutation(
    ({ data, admin }: CreateParams) =>
      new Promise(async (resolve, reject) => {
        try {
          if (!admin?.isAdmin) {
            reject('need admin right');
            return;
          }

          await fireStore.addDoc(
            fireStore.collection(fireStore.getFirestore(), 'classes'),
            data
          );

          resolve({
            ok: true,
          });
        } catch (e) {
          console.warn(e);
          reject('Could not update user');
        }
      })
  );

  return {
    create: mutateAsync,
    isLoading,
  };
};
