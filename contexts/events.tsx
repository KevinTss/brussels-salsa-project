import { createContext, ReactNode, useState } from 'react';
import { fireStore } from '../utils/firebase/clientApp';
import { Event } from '../types';
import { useUsers } from '../hooks';

const fireStoreInstance = fireStore.getFirestore();

export const EventsContext = createContext(null);

type EventProviderProps = {
  children: ReactNode | ReactNode[];
};
export const EventsProvider = ({ children }: EventProviderProps) => {
  // const [lastDateFetched, setLastDateFetched] = useState(null)
  const { list: usersList, getById: getUserById, add: addUser } = useUsers();

  const add = async (data: Event) => {
    await fireStore.addDoc(
      fireStore.collection(fireStoreInstance, 'events'),
      data
    );
  };

  const fetch = (dateFrom: Date) => {
    const eventQuery = fireStore.query(
      fireStore.collection(fireStoreInstance, 'events'),
      fireStore.where('date', '>=', dateFrom)
    );

    return new Promise((resolve, reject) => {
      fireStore.onSnapshot(eventQuery, (querySnapshot) => {
        const results: Event[] = [];
        querySnapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...(doc.data() as Event),
          });
        });
        console.log('results', results);
        const females = results?.[0]?.dancers?.females.map((f) => f.id) || [];
        const males = results?.[0]?.dancers?.males.map((m) => m.id) || [];

        const dancers = [...females, ...males].filter((u) => !!u);
        console.log('ok', dancers);

        if (dancers.length && dancers.every((item) => !!item)) {
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
    <EventsContext.Provider value={{ add, fetch }}>
      {children}
    </EventsContext.Provider>
  );
};
