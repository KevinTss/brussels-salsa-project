import { useMutation } from 'react-query';

import { User, LinkedUsers } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

type CreateParams = {
  user: User;
  partnerEmail: string;
};

export const useLinkUsersCreate = () => {
  const { mutateAsync, isLoading } = useMutation(
    ({ user, partnerEmail }: CreateParams) =>
      new Promise(async (resolve, reject) => {
        try {
          const linkedUsers: LinkedUsers = {
            leader: user.dancerRole === 'leader' ? user.id : partnerEmail,
            follower: user.dancerRole === 'follower' ? user.id : partnerEmail,
            status:
              user.dancerRole === 'leader'
                ? 'requested-by-leader'
                : 'requested-by-follower',
          };

          await fireStore.addDoc(
            fireStore.collection(fireStore.getFirestore(), 'linked-users'),
            linkedUsers
          );

          resolve({
            ok: true,
          });
        } catch (e) {
          console.warn(e);
          reject('Could not create link');
        }
      })
  );

  return {
    create: mutateAsync,
    isLoading,
  };
};
