import { createContext } from 'react';

import { fireStore } from '../../utils/firebase/clientApp';
import { useUsers } from '../../hooks';
import {
  // ClasseEventFetchOneParams,
  Children,
  ClasseEvent,
  DancerJoin,
  EventsContext as EventsContextType,
  NewClasseEvent,
  UpdateClasseEvent,
  User,
} from '../../types';

const fireStoreInstance = fireStore.getFirestore();

export const EventsContext = createContext<EventsContextType>({
  update: () => new Promise(() => ({})),
  add: () => new Promise(() => ({})),
  fetchOne: () => new Promise(() => ({})),
  fetch: () => new Promise(() => ({})),
});

export const EventsProvider = ({ children }: { children: Children }) => {
  const { list: usersList, add: addUser } = useUsers();

  const add = async (data: NewClasseEvent) =>
    await fireStore.addDoc(
      fireStore.collection(fireStoreInstance, 'events'),
      data
    );

  const update = (id: string, data: UpdateClasseEvent) => {
    const documentRef = fireStore.doc(fireStoreInstance, 'events', id);

    return fireStore.updateDoc(documentRef, data);
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
          const extractUserIds = ({ userId }: DancerJoin) => {
            if (!userListIds.includes(userId) && !newUsers.includes(userId)) {
              newUsers.push(userId);
            }
          };
          event.dancers?.leaders?.forEach(extractUserIds);
          event.dancers?.followers?.forEach(extractUserIds);
          if (event?.waitingList) {
            event.waitingList.leaders?.forEach(extractUserIds);
            event.waitingList.followers?.forEach(extractUserIds);
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
              } as User, true);
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
    // TODO: find why the type `ClasseEventFetchOneParams` is not working here
  }: any): Promise<ClasseEvent | null> => {
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
