import { useState } from 'react';

import { Dayjs, User, Classe, ClasseEvent } from '../types';
import { fireStore } from '../utils/firebase/clientApp';
import { getNewEvent } from '../utils';
import { useFetchEvent } from './useFetchEvent';

const fireStoreInstance = fireStore.getFirestore();

type useCreateEventParams = {
  user: User;
  classe: Classe;
  dayDate: Dayjs;
};

export const useCreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetch } = useFetchEvent();

  const create = ({
    user,
    classe,
    dayDate,
  }: useCreateEventParams): Promise<ClasseEvent> =>
    new Promise(async (resolve, reject) => {
      if (!user) throw Error('no-user');
      if (!classe) throw Error('no-classe');
      if (!dayDate) throw Error('no-day-date');

      setIsLoading(true);

      const newEvent = getNewEvent(user as User, classe, dayDate);
      try {
        const docRef = await fireStore.addDoc(
          fireStore.collection(fireStoreInstance, 'events'),
          newEvent
        );

        const newlyCreatedClasseEvent = await fetch(docRef.id);

        if (!newlyCreatedClasseEvent)
          throw Error('error-during-document-retrieving');

        setIsLoading(false);
        resolve(newlyCreatedClasseEvent);
      } catch (e) {
        console.warn(e);
        setIsLoading(false);
        reject('Could not fetch Events');
      }
    });

  return {
    create,
    isLoading,
  };
};
