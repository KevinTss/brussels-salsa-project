import { useMutation } from 'react-query';

import { User, ClasseUpdateData } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

type UpdateParams = {
  id: string;
  admin: User;
  data: ClasseUpdateData;
};

export const useClasseUpdate = () => {
  const { mutateAsync, isLoading } = useMutation(
    ({ id, data, admin }: UpdateParams) =>
      new Promise(async (resolve, reject) => {
        try {
          if (!admin?.isAdmin) {
            reject('need admin right');
            return;
          }

          await fireStore.updateDoc(
            fireStore.doc(fireStore.getFirestore(), 'classes', id),
            data
          );

          resolve({
            ok: true,
          });
        } catch (e) {
          console.warn(e);
          reject('Could not update class');
        }
      })
  );

  return {
    update: mutateAsync,
    isLoading,
  };
};
