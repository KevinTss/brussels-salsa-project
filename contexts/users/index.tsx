import { createContext, useState } from 'react';

import { fireStore } from '../../utils/firebase/clientApp';
import type {
  Children,
  UsersContext as UsersContextType,
  NewUserData as NewUserDataType,
  User as UserType,
} from '../../types';

const fireStoreInstance = fireStore.getFirestore();

export const UsersContext = createContext<UsersContextType>({
  add: () => {},
  create: () => {},
  edit: () => {},
  getAll: () => {},
  getById: () => null,
  list: [],
});

export const UsersProvider = ({ children }: { children: Children }) => {
  const [list, setList] = useState<UserType[]>([]);

  const add = (newUser: UserType) => {
    const userIndex = list.findIndex((user) => user.id === newUser.id);

    if (userIndex > -1) return;

    setList((previousList) => [...previousList, newUser]);
  };

  const getById = (id: string) => {
    const userIndex = list.findIndex((user) => user.id === id);

    if (userIndex === -1) return null;

    return list[userIndex];
  };

  const create = async (newData: NewUserDataType) =>
    await fireStore.setDoc(
      fireStore.doc(fireStoreInstance, 'users', newData.email as string),
      newData
    );

  const getAll = async () => {
    const query = fireStore.query(
      fireStore.collection(fireStoreInstance, 'users')
    );
    const querySnapshot = await fireStore.getDocs(query);
    const results: UserType[] = [];
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      } as UserType);
    });
    setList(() => results);
  };

  const edit = async (id: string, newData: NewUserDataType) => {
    const userIndex = list.findIndex((user) => user.id === id);

    if (userIndex === -1) throw new Error('User not in list');

    await fireStore.updateDoc(
      fireStore.doc(fireStore.getFirestore(), 'users', id),
      newData
    );
  };

  return (
    <UsersContext.Provider value={{ list, add, getById, create, getAll, edit }}>
      {children}
    </UsersContext.Provider>
  );
};
