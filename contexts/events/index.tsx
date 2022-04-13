import { createContext } from 'react';

import { fireStore } from '../../utils/firebase/clientApp';
import { useUsers } from '../../hooks';
import {
  Children,
  EventsContext as EventsContextType,
  ClasseEvent,
  NewEventData,
  DancerJoinType,
  EventFetchOneParams,
  User,
} from '../../types';

const fireStoreInstance = fireStore.getFirestore();

export const EventsContext = createContext<EventsContextType>({
  update: (id, data) => new Promise(() => {}),
  add: (data) => new Promise(() => {}),
  fetchOne: (data) => new Promise(() => {}),
  fetch: (dateFrom, dateTo) => new Promise(() => {}),
});

export const EventsProvider = ({ children }: { children: Children }) => {
  const { list: usersList, getById: getUserById, add: addUser } = useUsers();

  const add = async (data: NewEventData) =>
    await fireStore.addDoc(
      fireStore.collection(fireStoreInstance, 'events'),
      data
    );

  const update = (id: string, newData: NewEventData) => {
    const documentRef = fireStore.doc(fireStoreInstance, 'events', id);

    return fireStore.updateDoc(documentRef, newData);
  };

  const fetch = (dateFrom: Date, dateTo: Date): Promise<ClasseEvent[]> => {
    const eventQuery = fireStore.query(
      fireStore.collection(fireStoreInstance, 'events'),
      fireStore.where('date', '>=', dateFrom),
      fireStore.where('date', '<', dateTo)
    );

    // TODO handle error with reject
    return new Promise((resolve, _reject) => {
      fireStore.onSnapshot(eventQuery, (querySnapshot) => {
        const results: ClasseEvent[] = [];
        querySnapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          } as ClasseEvent);
        });

        const userListIds = usersList.map((u) => u.id);
        const dancers = results.reduce<string[]>((acc, event) => {
          let newUsers: string[] = [];
          const extractUserIds = ({ userId }: DancerJoinType) => {
            if (!userListIds.includes(userId) && !newUsers.includes(userId)) {
              newUsers.push(userId);
            }
          };
          event.dancers?.males?.forEach(extractUserIds);
          event.dancers?.females?.forEach(extractUserIds);
          if (event?.waitingList) {
            event.waitingList.males?.forEach(extractUserIds);
            event.waitingList.females?.forEach(extractUserIds);
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
              } as User);
            });

            resolve(results);
          });
        } else {
          resolve(results);
        }
      });
    });
  };

  const fetchOne = async ({
    classId,
    dateFrom,
    dateTo,
    eventId,
  }: EventFetchOneParams): Promise<ClasseEvent | null> => {
    if (eventId) {
      const docRef = fireStore.doc(fireStoreInstance, 'events', eventId);
      const docSnap = await fireStore.getDoc(docRef);

      return docSnap.exists()
        ? ({ id: eventId, ...docSnap.data() } as ClasseEvent)
        : null;
    } else if (classId && dateFrom && dateTo) {
      const eventQuery = fireStore.query(
        fireStore.collection(fireStoreInstance, 'events'),
        fireStore.where('classId', '==', classId),
        fireStore.where('date', '>=', dateFrom),
        fireStore.where('date', '<', dateTo)
      );
      const querySnapshot = await fireStore.getDocs(eventQuery);
      let event: ClasseEvent | null = null;
      querySnapshot.forEach((doc) => {
        if (!event) {
          event = {
            id: doc.id,
            ...doc.data(),
          } as ClasseEvent;
        }
      });

      return event;
    }

    return null;
  };

  return (
    <EventsContext.Provider value={{ add, fetch, update, fetchOne }}>
      {children}
    </EventsContext.Provider>
  );
};
