import { createContext, useState, useEffect } from 'react';

import { fireStore } from '../../utils/firebase/clientApp';

import type {
  ClasseType,
  Children,
  ClassesContext as ClassesContextType,
  NewClasseData,
} from '../../types';

export const ClassesContext = createContext<ClassesContextType | null>(null);

export const ClassesProvider = ({ children }: { children: Children }) => {
  const [list, setList] = useState<ClasseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = fireStore.query(
      fireStore.collection(fireStore.getFirestore(), 'classes')
    );
    const unsubscribe = fireStore.onSnapshot(query, (querySnapshot) => {
      const classes: ClasseType[] = [];
      querySnapshot.forEach((doc) => {
        classes.push({
          id: doc.id,
          ...doc.data(),
        } as ClasseType);
      });
      setList(classes);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const add = async (data: NewClasseData) => {
    await fireStore.addDoc(
      fireStore.collection(fireStore.getFirestore(), 'classes'),
      data
    );
  };

  const getById = (id: string) => {
    if (!list.length) return null;

    return list.find((classe) => classe.id === id) || null;
  };

  return (
    <ClassesContext.Provider value={{ list, add, loading, getById }}>
      {children}
    </ClassesContext.Provider>
  );
};
