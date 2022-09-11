import { useQuery } from 'react-query';

import { User, LinkedUsers } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();
const collectionRef = fireStore.collection(fireStoreInstance, 'linked-users');
const getDocs = fireStore.getDocs;

type LinkedUserObject = {
  id: string;
} & LinkedUsers;

export const useLinkUsersGetByEmail = (user?: User) => {
  const { data, isLoading, refetch, status } = useQuery<
    LinkedUserObject | undefined
  >(
    ['linkedUsers', user?.id || ''],
    () =>
      new Promise(async (resolve, reject) => {
        try {
          if (!user) {
            reject('No user');
            return;
          }

          const query = fireStore.query(
            collectionRef,
            fireStore.where(
              user.dancerRole === 'leader' ? 'leader' : 'follower',
              '==',
              user.id
            )
          );
          const querySnapshot = await getDocs(query);

          let result: LinkedUserObject | undefined = undefined;

          if (querySnapshot.size) {
            result = {
              id: querySnapshot.docs[0].id,
              ...querySnapshot.docs[0].data(),
            } as LinkedUserObject;

            resolve(result);
          } else {
            resolve(undefined);
          }
        } catch (e) {
          console.warn(e);
          reject('Could not create link');
        }
      }),
    {
      enabled: !!user,
    }
  );

  return {
    data,
    isLoading,
    refetch,
    status,
  };
};
