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

  const update = (id, newData) => {
    const documentRef = fireStore.doc(fireStoreInstance, 'events', id);

    return fireStore.updateDoc(documentRef, newData);
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

        const userListIds = usersList.map((u) => u.id);
        const dancers = results.reduce((acc, event) => {
          let newUsers = [];
          const extractUserIds = ({ userId }) => {
            if (!userListIds.includes(userId) && !newUsers.includes(userId)) {
              newUsers.push(userId);
            }
          };
          event.dancers.males.forEach(extractUserIds);
          event.dancers.females.forEach(extractUserIds);
          if (event.waitingList) {
            event.waitingList.males.forEach(extractUserIds);
            event.waitingList.females.forEach(extractUserIds);
          }

          return [...acc, ...newUsers];
        }, []);

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

  const fetchOne = async ({ classId, dateFrom, dateTo, eventId }) => {
    if (eventId) {
      const docRef = fireStore.doc(fireStoreInstance, 'events', eventId);
      const docSnap = await fireStore.getDoc(docRef);

      return docSnap.exists() ? { id: eventId, ...docSnap.data() } : null;
    } else if (classId && dateFrom && dateTo) {
      const eventQuery = fireStore.query(
        fireStore.collection(fireStoreInstance, 'events'),
        fireStore.where('classId', '==', classId),
        fireStore.where('date', '>=', dateFrom),
        fireStore.where('date', '<', dateTo)
      );
      const querySnapshot = await fireStore.getDocs(eventQuery);
      let event = null;
      querySnapshot.forEach((doc) => {
        if (!event) {
          event = {
            id: doc.id,
            ...doc.data(),
          };
        }
      });

      return event;
    }
  };

  return (
    <EventsContext.Provider value={{ add, fetch, update, fetchOne }}>
      {children}
    </EventsContext.Provider>
  );
};
