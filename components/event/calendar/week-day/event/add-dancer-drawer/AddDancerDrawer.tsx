import { Dayjs } from 'dayjs';

import { Dialog, Button, triggerToast } from '../../../../../ui';
import { SubTitle, Text } from '../../../../../../styles/GlobalStyle';
import {
  getLevelDisplay,
  getNewEvent,
  getDateAndDayAfter,
} from '../../../../../../utils';
import { useEvents, useUsers } from '../../../../../../hooks';
import { DancersContainer, FullNameContainer } from './style';
import {
  EventType,
  ClasseType,
  DancersListType,
} from '../../../../../../types';

type AddDancerDrawer = {
  isOpen: boolean;
  onClose: () => void;
  event: EventType;
  classe: ClasseType;
  dayDate: Dayjs;
  refetchEvents: () => void;
};

const AddDancerDrawer = ({
  isOpen,
  onClose,
  event,
  classe,
  dayDate,
  refetchEvents,
}: AddDancerDrawer) => {
  const { list } = useUsers();
  const {
    add: addEvent,
    update: updateEvent,
    fetchOne: fetchEvent,
  } = useEvents();

  const eventUserList = {
    dancers: {
      males: event?.dancers?.males?.map((dancer) => dancer.userId) || [],
      females: event?.dancers?.females?.map((dancer) => dancer.userId) || [],
    },
    waitingList: {
      males: event?.waitingList?.males?.map((dancer) => dancer.userId) || [],
      females:
        event?.waitingList?.females?.map((dancer) => dancer.userId) || [],
    },
  };

  const userList = list.filter(
    (user) =>
      !eventUserList.dancers.males.includes(user?.id || '') &&
      !eventUserList.dancers.females.includes(user?.id || '')
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} type='large'>
      <SubTitle>{`Add a dancer to ${classe.type} ${getLevelDisplay(
        classe.level
      )} on ${classe.day}`}</SubTitle>
      <DancersContainer>
        {userList.map((user, i) => (
          <FullNameContainer key={`m-${i}`}>
            <Text>{user?.id}</Text>
            <Button
              iconLeft={undefined}
              appearance={undefined}
              iconRight={undefined}
              isDisabled={undefined}
              isLoading={undefined}
              isIconReverse={undefined}
              onClick={async () => {
                if (!event) {
                  const newEvent = getNewEvent(user, classe, dayDate);
                  await addEvent(newEvent);
                  refetchEvents();
                } else {
                  const [dateFrom, dateTo] = getDateAndDayAfter(dayDate);
                  const newlyFetchedEvent = await fetchEvent({
                    classId: classe.id as string,
                    dateFrom,
                    dateTo,
                  });
                  if (!newlyFetchedEvent) {
                    triggerToast.error(
                      'Something went wrong on adding the user, the event was not found'
                    );
                    return;
                  } else {
                    console.log('newlyFetchedEvent', newlyFetchedEvent);
                    // @ts-ignore: Unreachable code error
                    newlyFetchedEvent.dancers[`${user.gender}s`].push({
                      joinOn: new Date(),
                      userId: user.id,
                      by: 'admin',
                    });
                  }

                  await updateEvent(
                    newlyFetchedEvent.id as string,
                    newlyFetchedEvent
                  );
                  await refetchEvents();
                }
              }}
            >
              {'Add'}
            </Button>
          </FullNameContainer>
        ))}
      </DancersContainer>
    </Dialog>
  );
};

export default AddDancerDrawer;
