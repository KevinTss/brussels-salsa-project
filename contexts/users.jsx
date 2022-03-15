import { createContext, useState } from 'react';

import { fireStore } from '../utils/firebase/clientApp';

const fireStoreInstance = fireStore.getFirestore();

export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [list, setList] = useState([]);

  const add = (newUser) => {
    const userIndex = list.findIndex((user) => user.id === newUser.id);

    if (userIndex > -1) return;

    setList((previousList) => [...previousList, newUser]);
  };

  const getById = (id) => {
    const userIndex = list.findIndex((user) => user.id === id);

    if (userIndex === -1) return null;

    return list[userIndex];
  };

  const create = async (newData) =>
    await fireStore.setDoc(
      fireStore.doc(fireStoreInstance, 'users', newData.email),
      newData
    );
  
  const getAll = async () => {
    const query = fireStore.query(
      fireStore.collection(fireStoreInstance, 'users')
    );
    const querySnapshot = await fireStore.getDocs(query);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setList(() => results);
  };

  const editById = (id, newData) => {
    const userIndex = list.findIndex((user) => user.id === id);

    if (userIndex === -1) throw new Error('User not in list');

    const data = { ...list[userIndex], ...newData };
    console.log('data', data);
  };

  return (
    <UsersContext.Provider
      value={{ list, add, getById, create, getAll, editById }}
    >
      {children}
    </UsersContext.Provider>
  );
};
