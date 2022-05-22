import { createContext, useState, useEffect } from 'react';

import { fireStore } from '../../utils/firebase/clientApp';

import {
  Classe,
  Children,
  ClassesContext as ClassesContextType,
  NewClasse,
  WeekDay
} from '../../types';

export const ClassesContext = createContext<ClassesContextType>({
  edit: (id, data) => new Promise(() => {}),
  add: (data) => new Promise(() => {}),
  deleteById: (id) => new Promise(() => {}),
  getById: (id) => null,
  list: [],
  loading: false,
});

export const ClassesProvider = ({ children }: { children: Children }) => {
  const [list, setList] = useState<Classe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(
      'get classes'
    )
    try {
      const query = fireStore.query(
        fireStore.collection(fireStore.getFirestore(), 'classes')
      );
      const unsubscribe = fireStore.onSnapshot(query, (querySnapshot) => {
        const classes: Classe[] = [];
        querySnapshot.forEach((doc) => {
          classes.push({
            id: doc.id,
            ...doc.data(),
          } as Classe);
        });
        console.group();
        console.warn('Classes fetched');
        console.warn('Data', classes);
        console.groupEnd();
        setList(classes);
        setLoading(false);
      });

      return unsubscribe;
    } catch (e) {
      console.warn(e)
      setLoading(false);
    }

  }, []);

  const add = async (data: NewClasse) => {
    await fireStore.addDoc(
      fireStore.collection(fireStore.getFirestore(), 'classes'),
      data
    );
  };

  const getById = (id: string) => {
    if (!list.length) return null;

    return list.find((classe) => classe.id === id) || null;
  };

  const deleteById = async (id: string) => {
    await fireStore.deleteDoc(
      fireStore.doc(fireStore.getFirestore(), 'classes', id)
    );
  };

  const edit = async (id: string, newData: NewClasse) => fireStore.updateDoc(
      fireStore.doc(fireStore.getFirestore(), 'classes', id),
    newData
  );


  function getNumberDay(day: WeekDay) {
    const index = Object.values(WeekDay).findIndex((val) => val === day)

    return index >= 0 ? index : 0
  }

  const sortedListByDay = [...list].sort((a, b) => {
    const dayA = getNumberDay(a.day)
    const dayB = getNumberDay(b.day)

    return dayA - dayB
  })
  // const sortedListByHour = [...sortedListByDay].sort((a, b) => {
  //   if (a.time < b.time) {
  //     return -1;
  //   }
  //   if (a.time > b.time) {
  //     return 1;
  //   }

  //   // names must be equal
  //   return 0;
  // })

  return (
    <ClassesContext.Provider
      value={{ list: sortedListByDay, add, loading, getById, deleteById, edit }}
    >
      {children}
    </ClassesContext.Provider>
  );
};
