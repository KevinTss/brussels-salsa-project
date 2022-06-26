import { useMutation } from 'react-query';

import { User, ClasseEventUpdate } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

type UpdateParams = {
  id: string;
  admin: User;
  data: ClasseEventUpdate;
};

export const useEventUpdate = () => {
  const { mutateAsync, isLoading } = useMutation(
    ({ id, data, admin }: UpdateParams) =>
      new Promise(async (resolve, reject) => {
        try {
          if (!admin?.isAdmin) {
            reject('need admin right');
            return;
          }

          await fireStore.updateDoc(
            fireStore.doc(fireStore.getFirestore(), 'event', id),
            data
          );

          resolve({
            ok: true,
          });
        } catch (e) {
          console.warn(e);
          reject('Could not update event');
        }
      })
  );

  return {
    update: mutateAsync,
    isLoading,
  };
};
