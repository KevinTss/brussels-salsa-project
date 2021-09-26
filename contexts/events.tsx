import { createContext, ReactNode } from 'react';
import { fireStore } from '../utils/firebase/clientApp';
import { Event } from '../types';

const fireStoreInstance = fireStore.getFirestore();

export const EventsContext = createContext(null);

type EventProviderProps = {
  children: ReactNode | ReactNode[];
};
export const EventsProvider = ({ children }: EventProviderProps) => {
  const add = async (data: Event) => {
    await fireStore.addDoc(
      fireStore.collection(fireStoreInstance, 'events'),
      data
    );
  };

  const fetch = (dateFrom: Date) => {
    const query = fireStore.query(
      fireStore.collection(fireStoreInstance, 'events'),
      fireStore.where('date', '==', dateFrom)
    );

    return new Promise((resolve, reject) => {
      fireStore.onSnapshot(query, (querySnapshot) => {
        const results: Event[] = [];
        querySnapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...(doc.data() as Event),
          });
        });

        resolve(results);
      });
    });
  };

  return (
    <EventsContext.Provider value={{ add, fetch }}>
      {children}
    </EventsContext.Provider>
  );
};
