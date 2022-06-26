import { useQuery } from 'react-query';

import { User } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

type UseUsersParams = {
  admin?: User;
};

export const useUsers = ({ admin }: UseUsersParams) => {
  const { data, refetch, isLoading } = useQuery<User[], Error>(
    'users',
    () =>
      new Promise(async (resolve, reject) => {
        try {
          const query = fireStore.query(
            fireStore.collection(fireStoreInstance, 'users')
          );
          const querySnapshot = await fireStore.getDocs(query);
          const result: User[] = [];
          querySnapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            } as User);
          });
          resolve(result);
        } catch (e) {
          console.warn(e);
          reject('Could not fetch Events');
        }
      }),
    {
      enabled: !!admin?.isAdmin,
    }
  );

  return {
    list: data,
    refetch,
    isLoading,
  };
};
