import { createContext, useState } from 'react';

import { fireStore } from '../../utils/firebase/clientApp';
import type {
  Children,
  UsersContext as UsersContextType,
  NewUser,
  User,
  UpdateUser
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
  const [list, setList] = useState<User[]>([]);
  const [listByIds, setListByIds] = useState<User[]>([]);

  const add = (newUser: User, singleList = false) => {
    const listToAdd = singleList ? listByIds : list
    const userIndex = listToAdd.findIndex((user) => user.id === newUser.id);

    if (userIndex > -1) return;

    if (singleList) {
      setListByIds((previousList) => [...previousList, newUser]);
    } else {
      setList((previousList) => [...previousList, newUser]);
    }
  };

  const getById = (id: string) => {
    let isListByIds = false
    let userIndex = list.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      userIndex = listByIds.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return null
      } else {
        isListByIds = true
      }
    }

    return isListByIds ? listByIds[userIndex] : list[userIndex];
  };

  const create = async (newData: NewUser) =>
    await fireStore.setDoc(
      fireStore.doc(fireStoreInstance, 'users', newData.email as string),
      newData
    );

  const getAll = async () => {
    try {
      const query = fireStore.query(
        fireStore.collection(fireStoreInstance, 'users')
      );
      const querySnapshot = await fireStore.getDocs(query);
      const results: User[] = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        } as User);
      });
      setList(() => results);
    } catch (e) {
      console.warn('error on get all users', e)
    }
  };

  const edit = async (id: string, newData: UpdateUser) => {
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
