import { useEffect, useState } from 'react';
import { fireStore } from '../utils/firebase/clientApp';

export const useClass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [data, setData] = useState([]);

  const fetch = (classId: string) => {
    setIsError('');
    setIsLoading(true);
    const docRef = fireStore.doc(
      fireStore.getFirestore(),
      'classes',
      classId as string // Ex: 'kOmyb3ZSZCjd9FDFZrS5'
    );
    fireStore
      .getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setIsLoading(false);
          // TODO: type the correct object
          setData(docSnap.data() as any);
        } else {
          // doc.data() will be undefined in this case
          setIsLoading(false);
          setIsError('no-document');
        }
      })
      .catch((e) => {
        console.log('e', e);
        setIsLoading(false);
        setIsError('internal-error');
      });
  };

  return { data, isLoading, isError, fetch };
};

export const useClasses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsError('');
    setIsLoading(true);

    const q = fireStore.query(
      fireStore.collection(fireStore.getFirestore(), 'classes')
      // fireStore.where('level', '==', 'beginner')
    );

    fireStore
      .getDocs(q)
      .then((querySnapshot) => {
        setIsLoading(false);
        setData(
          // TODO: type querySnapshot
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      .catch((e) => {
        console.log('e', e);
        setIsLoading(false);
        setIsError('internal-error');
      });
  }, []);

  return { data, isLoading, isError };
};
