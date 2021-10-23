import { createContext } from 'react';

import { fireStore } from '../utils/firebase/clientApp';
import { useUsers } from '../hooks';

const fireStoreInstance = fireStore.getFirestore();

export const EventsContext = createContext(null);

export const EventsProvider = ({ children }) => {
  const { list: usersList, getById: getUserById, add: addUser } = useUsers();

  const add = async (data) => {
    await fireStore.addDoc(
      fireStore.collection(fireStoreInstance, 'events'),
      data
    );
  };

  const update = async (id, newData) => {
    const documentRef = fireStore.doc(fireStoreInstance, 'events', id);

    await fireStore.updateDoc(documentRef, newData);
  };

  const fetch = (dateFrom, dateTo) => {
    const eventQuery = fireStore.query(
      fireStore.collection(fireStoreInstance, 'events'),
      fireStore.where('date', '>=', dateFrom),
      fireStore.where('date', '<', dateTo)
    );

    // TODO handle error with reject
    return new Promise((resolve, _reject) => {
      fireStore.onSnapshot(eventQuery, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        const users = [
          ...(results?.[0]?.dancers?.females.map(({ userId }) => userId) || []),
          ...(results?.[0]?.dancers?.males.map(({ userId }) => userId) || []),
          ...(results?.[0]?.waitingList?.females.map(({ userId }) => userId) ||
            []),
          ...(results?.[0]?.waitingList?.males.map(({ userId }) => userId) ||
            []),
        ];
        const dancers = users.filter((u) => !!u && !getUserById(u));

        if (dancers.length) {
          const usersQuery = fireStore.query(
            fireStore.collection(fireStoreInstance, 'users'),
            fireStore.where('email', 'in', dancers)
          );

          fireStore.onSnapshot(usersQuery, (usersQuerySnapshot) => {
            usersQuerySnapshot.forEach((doc) => {
              addUser({
                id: doc.id,
                ...doc.data(),
              });
            });

            resolve(results);
          });
        } else {
          resolve(results);
        }
      });
    });
  };

  return (
    <EventsContext.Provider value={{ add, fetch, update }}>
      {children}
    </EventsContext.Provider>
  );
};
