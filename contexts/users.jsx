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

  return (
    <UsersContext.Provider value={{ list, add, getById, create }}>
      {children}
    </UsersContext.Provider>
  );
};
