import { useQueryClient } from 'react-query';

import { ClasseEvent, Classe, User, Dayjs } from '../types';
import {
  hasUserClassLevelRequired,
  isEventFull,
  addUserToWaitingList,
  shouldCheckBalance_v2,
  addUserToDancers,
  isOppositeRoleInMajority,
  isLimitOffsetReached_v2,
  handleWaitingList,
} from '../utils';
import { useFetchEvent } from './useFetchEvent';
// import useFetchEventByDateRange from './useFetchEventByDateRange';
import { useCreateEvent } from './useCreateEvent';
import { useUpdateEvent } from './useUpdateEvent';

type useJoinEventParams = {
  classe: Classe;
  event?: ClasseEvent;
  dayDate: Dayjs;
};

// const getDateFromAndTo = (dayDate: Dayjs) => {
//   const [date, dateTomorrow] = getDateAndDayAfter(dayDate);

//   return {
//     dateFrom: date,
//     dateTo: dateTomorrow,
//   };
// };

export const useJoinEvent = ({
  event,
  classe,
  dayDate,
}: useJoinEventParams) => {
  const queryClient = useQueryClient();
  const { fetch: fetchById } = useFetchEvent();
  // const { fetch: fetchByDateRange } = useFetchEventByDateRange();
  const { create } = useCreateEvent();
  const { update } = useUpdateEvent();

  const join = (user?: User) =>
    new Promise<boolean>(async (resolve, reject) => {
      if (!classe) reject('no-classe');

      if (!user) reject('no-user');

      if (!hasUserClassLevelRequired(user as User, classe))
        reject('no-required-level');

      try {
        const newlyFetchedEvent = event?.id
          ? await fetchById(event.id)
          : undefined;
        // const newlyFetchedEvent = event
        //   ? await fetchById(event.id)
        //   : await fetchByDateRange({
        //       classId: classe.id,
        //       ...getDateFromAndTo(dayDate),
        //     });

        if (newlyFetchedEvent) {
          let updatedEvent: ClasseEvent;
          let whereTheUserWereAdded: 'waitingList' | 'dancers';
          /**
           * The order of checks is IMPORTANT
           */
          if (isEventFull(newlyFetchedEvent, classe)) {
            updatedEvent = addUserToWaitingList(
              newlyFetchedEvent,
              user as User
            );
            whereTheUserWereAdded = 'waitingList';
          } else if (!shouldCheckBalance_v2(newlyFetchedEvent, classe)) {
            updatedEvent = addUserToDancers(newlyFetchedEvent, user as User);
            whereTheUserWereAdded = 'dancers';
          } else if (
            isOppositeRoleInMajority(newlyFetchedEvent, user as User)
          ) {
            updatedEvent = addUserToDancers(newlyFetchedEvent, user as User);
            whereTheUserWereAdded = 'dancers';
          } else if (isLimitOffsetReached_v2(newlyFetchedEvent, classe)) {
            updatedEvent = addUserToWaitingList(
              newlyFetchedEvent,
              user as User
            );
            whereTheUserWereAdded = 'waitingList';
          } else {
            updatedEvent = addUserToDancers(newlyFetchedEvent, user as User);
            whereTheUserWereAdded = 'dancers';
          }

          const { updatedEvent: finalUpdatedEvent, addedDancerIds } =
            handleWaitingList(updatedEvent, classe);

          const eventId = finalUpdatedEvent.id;
          // TODO: send email to added users
          console.info('addedDancerIds', addedDancerIds);
          delete finalUpdatedEvent.id;

          await update({ id: eventId as string, data: finalUpdatedEvent });
        } else {
          await create({
            user: user as User,
            classe,
            dayDate,
          });
        }

        queryClient.invalidateQueries('eventsList');

        resolve(true);
      } catch (error: any) {
        reject(error.message);
      }
    });

  return {
    join,
  };
};
