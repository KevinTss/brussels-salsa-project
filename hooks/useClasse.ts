import { useQuery } from 'react-query';

import { Classe } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

type UseClasseParams = {
  id: string;
};
export const useClasse = ({ id }: UseClasseParams) => {
  const { data, isLoading, refetch } = useQuery<Classe | null, Error>(
    ['classe', id],
    () =>
      new Promise(async (resolve, reject) => {
        try {
          console.info('fetch classe by id', id);
          const docRef = fireStore.doc(fireStore.getFirestore(), 'classes', id);
          const docSnap = await fireStore.getDoc(docRef);

          resolve(
            docSnap.exists() ? ({ id, ...docSnap.data() } as Classe) : null
          );
        } catch (e) {
          console.warn(e);
          reject('Could not fetch classe');
        }
      }),
    {
      enabled: !!id,
    }
  );

  return {
    data: data || null,
    isLoading,
    refetch,
  };
};
