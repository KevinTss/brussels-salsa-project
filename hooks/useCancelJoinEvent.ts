import { ClasseEvent, Classe, User, Dayjs } from '../types';
import { handleWaitingList, removeUserFromEvent } from '../utils';
import { useFetchEvent } from './useFetchEvent';
import { useUpdateEvent } from './useUpdateEvent';

type useJoinEventParams = {
  classe: Classe;
  event: ClasseEvent;
  dayDate: Dayjs;
};

export const useCancelJoinEvent = ({ event, classe }: useJoinEventParams) => {
  const { fetch: fetchById } = useFetchEvent();
  const { update } = useUpdateEvent();

  const cancelJoin = (user?: User) =>
    new Promise<boolean>(async (resolve, reject) => {
      if (!classe) reject('no-classe');
      if (!user) reject('no-user');

      try {
        const newlyFetchedEvent = await fetchById(event.id);

        if (newlyFetchedEvent) {
          const updatedEvent = removeUserFromEvent(
            newlyFetchedEvent,
            user as User
          );
          const { updatedEvent: finalUpdatedEvent, addedDancerIds } =
            handleWaitingList(updatedEvent, classe);
          const eventId = finalUpdatedEvent.id;
          // TODO: send email to added users
          console.info('addedDancerIds', addedDancerIds);
          delete finalUpdatedEvent.id;

          await update({ id: eventId as string, data: finalUpdatedEvent });
        } else {
          reject('error-during-fetching-event');
        }

        resolve(true);
      } catch (error: any) {
        reject(error.message);
      }
    });

  return {
    cancelJoin,
  };
};
