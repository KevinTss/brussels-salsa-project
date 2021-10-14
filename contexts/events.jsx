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

    /**
     * @todo handle error with reject
     */
    return new Promise((resolve, reject) => {
      fireStore.onSnapshot(eventQuery, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        const females = results?.[0]?.dancers?.females || [];
        const males = results?.[0]?.dancers?.males || [];

        const dancers = [...females, ...males].filter((u) => !!u);

        if (dancers.length && dancers.every((item) => !!item)) {
          // TODO fetch only not-fetched-yet users
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
