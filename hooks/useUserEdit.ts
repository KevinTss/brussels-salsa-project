import { useMutation } from 'react-query';

import { User, UpdateUser } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

type EditParams = {
  user: User;
  newData: UpdateUser;
  admin: User;
};

export const useUserEdit = () => {
  const { mutateAsync } = useMutation(
    ({ user, newData, admin }: EditParams) =>
      new Promise(async (resolve, reject) => {
        try {
          if (!admin?.isAdmin) {
            reject('need admin right');
            return;
          }
          // const userIndex = list.findIndex((user) => user.id === id);

          // if (userIndex === -1) throw new Error('User not in list');

          await fireStore.updateDoc(
            fireStore.doc(fireStore.getFirestore(), 'users', user.id),
            newData
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
    edit: mutateAsync,
  };
};
