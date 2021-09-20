import { createContext, useState, useEffect } from 'react';
import { fireStore } from '../utils/firebase/clientApp';

export const ClassesContext = createContext(null);

export const ClassesProvider = ({ children }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const query = fireStore.query(
      fireStore.collection(fireStore.getFirestore(), 'classes')
      // where('state', '==', 'CA')
    );
    const unsubscribe = fireStore.onSnapshot(query, (querySnapshot) => {
      const classes = [];
      querySnapshot.forEach((doc) => {
        classes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setList(classes);
    });

    return unsubscribe;
  }, []);

  const add = async (data) => {
    await fireStore.addDoc(
      fireStore.collection(fireStore.getFirestore(), 'classes'),
      data
    );
  };

  return (
    <ClassesContext.Provider value={{ list, add }}>
      {children}
    </ClassesContext.Provider>
  );
};
