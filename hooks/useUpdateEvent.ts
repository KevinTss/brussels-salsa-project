import { useState } from 'react';

import { ClasseEvent, ClasseEventWithOptionalId } from '../types';
import { fireStore } from '../utils/firebase/clientApp';

import { useFetchEvent } from './useFetchEvent';

const fireStoreInstance = fireStore.getFirestore();

type useUpdateEventParams = {
  id: string;
  data: ClasseEventWithOptionalId;
};

export const useUpdateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetch } = useFetchEvent();

  const update = ({ id, data }: useUpdateEventParams): Promise<ClasseEvent> =>
    new Promise(async (resolve, reject) => {
      if (!id) throw Error('no-event-id');
      if (!data) throw Error('no-data');

      setIsLoading(true);

      try {
        const documentRef = fireStore.doc(fireStoreInstance, 'events', id);

        if (data.id) {
          delete data.id;
        }

        await fireStore.updateDoc(documentRef, data);

        const newlyUpdatedClasseEvent = await fetch(id);

        if (!newlyUpdatedClasseEvent)
          throw Error('error-during-document-retrieving');

        setIsLoading(false);
        resolve(newlyUpdatedClasseEvent);
      } catch (e) {
        console.warn(e);
        setIsLoading(false);
        reject('Could not update event');
      }
    });

  return {
    update,
    isLoading,
  };
};
