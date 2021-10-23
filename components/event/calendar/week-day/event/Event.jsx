import { useState } from 'react';

import {
  EventContainer,
  DancersContainer,
  MalesContainer,
  FemalesContainer,
  EventPrimariesInfo,
  CallToActions,
} from './style';
import { useUsers, useAuth } from '../../../../../hooks';
import { Button, Avatar } from '../../../../ui';
import { dayjsInstance, getEventNameDisplay } from '../../../../../utils';
import DetailsDrawer from './details-drawer';

const Event = ({
  classData,
  event,
  fetchEvents,
  dayDate,
  addEvent,
  updateEvent,
  isAdminMode,
}) => {
  const { getById, list } = useUsers();
  const { currentUser } = useAuth();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const males = event
    ? event.dancers.males.map((dancer) => getById(dancer.userId))
    : [];
  const females = event
    ? event.dancers.females.map((dancer) => getById(dancer.userId))
    : [];

  let isUserAlreadyInEvent = false;
  if (!isAdminMode) {
    isUserAlreadyInEvent =
      currentUser?.gender === 'male'
        ? !!event?.dancers?.males?.find(
            ({ userId }) => userId === currentUser.id
          ) ||
          !!event?.waitingList?.males?.find(
            ({ userId }) => userId === currentUser.id
          )
        : !!event?.dancers?.females?.find(
            ({ userId }) => userId === currentUser.id
          ) ||
          !!event?.waitingList?.females?.find(
            ({ userId }) => userId === currentUser.id
          );
  }

  let waitingListLength =
    (event?.waitingList?.males?.length || 0) +
    (event?.waitingList?.females?.length || 0);

  const joinHandle = async () => {
    if (isAdminMode) return;

    const eventDate = dayjsInstance()
      .year(dayDate.year())
      .month(dayDate.month())
      .date(dayDate.date())
      .hour(Number(classData.time.split(':')[0]))
      .minute(Number(classData.time.split(':')[1]));

    if (eventDate.isBefore(dayjsInstance())) {
      // TODO error toast if event in the past
      return;
    }

    /**
     * If no event, create one
     */
    if (!event) {
      const newEvent = {
        classId: classData.id,
        dancers: {
          males:
            currentUser.gender === 'male'
              ? [
                  {
                    joinOn: new Date(),
                    userId: currentUser.id,
                  },
                ]
              : [],
          females:
            currentUser.gender === 'female'
              ? [
                  {
                    joinOn: new Date(),
                    userId: currentUser.id,
                  },
                ]
              : [],
        },
        date: dayDate.hour(0).minute(0).second(0).toDate(),
      };
      await addEvent(newEvent);
      fetchEvents();
      return;
    } else if (isUserAlreadyInEvent) {
      // TODO: display toast error
      console.warn('user-already-in-event');
    } else {
      const totalDancers = males.length + females.length;
      const updatedEvent = event;
      if (
        totalDancers < classData.spots.base &&
        totalDancers < (classData?.spots?.max || 999)
      ) {
        updatedEvent.dancers[`${currentUser.gender}s`].push({
          joinOn: new Date(),
          userId: currentUser.id,
        });
      } else if (
        totalDancers >= classData.spots.base &&
        classData?.spots?.max &&
        totalDancers < classData.spots.max
      ) {
        // We need to check the balance
        const sameGenderAmount =
          currentUser.gender === 'male' ? males.length : females.length;
        const oppositeGenderAmount =
          currentUser.gender === 'male' ? females.length : males.length;
        let listToAddTheNewDancer;
        if (sameGenderAmount > oppositeGenderAmount) {
          listToAddTheNewDancer = `waitingList`;
        } else {
          listToAddTheNewDancer = `dancers`;
        }
        updatedEvent[listToAddTheNewDancer][`${currentUser.gender}s`].push({
          joinOn: new Date(),
          userId: currentUser.id,
        });
      } else if (classData?.spots?.max && totalDancers >= classData.spots.max) {
        // Add the user to the waiting list
        updatedEvent.waitingList[`${currentUser.gender}s`].push({
          joinOn: new Date(),
          userId: currentUser.id,
        });
      }
      updateEvent(event.id, updatedEvent);
      fetchEvents();
    }
  };

  const cancelHandle = () => {
    if (!isUserAlreadyInEvent) {
      /**
       * @todo show error toast
       */
    }
    const currentUserGender = `${currentUser.gender}s`;
    const isUserOnWaitingList = !!event.waitingList[currentUserGender].find(
      ({ userId }) => userId === currentUser.id
    );
    const updatedEvent = event;
    const list = isUserOnWaitingList ? 'waitingList' : 'dancers';
    const userIdIndex = updatedEvent[list][currentUserGender].findIndex(
      (userId) => userId === currentUser.id
    );
    updatedEvent[list][currentUserGender].splice(userIdIndex, 1);
    updateEvent(event.id, updatedEvent);
    fetchEvents();
  };

  return (
    <EventContainer>
      <EventPrimariesInfo>
        <h4>{getEventNameDisplay(classData.type, classData.level)}</h4>
        <div>{classData.time}</div>
      </EventPrimariesInfo>
      <DancersContainer $isHidden={!isAdminMode}>
        <h4>
          Dancers
          {!!waitingListLength && (
            <span>{waitingListLength} on waiting list</span>
          )}
        </h4>
        <MalesContainer>
          <p>Mens</p>
          <div>
            {males.map((m, i) => (
              <Avatar
                key={`m-${i}`}
                firstName={m?.fullName?.split(' ')[0]}
                lastName={m?.fullName?.split(' ')[1]}
              />
            ))}
          </div>
        </MalesContainer>
        <FemalesContainer>
          <p>Girls</p>
          <div>
            {females.map((f, i) => (
              <Avatar
                key={`f-${i}`}
                firstName={f?.fullName?.split(' ')[0]}
                lastName={f?.fullName?.split(' ')[1]}
              />
            ))}
          </div>
        </FemalesContainer>
      </DancersContainer>
      <CallToActions>
        {!isAdminMode && !isUserAlreadyInEvent && (
          <Button appearance='primary' onClick={joinHandle}>
            Join
          </Button>
        )}
        {!isAdminMode && isUserAlreadyInEvent && (
          <Button appearance='minimal' onClick={cancelHandle}>
            Cancel
          </Button>
        )}
        {isAdminMode && (
          <Button
            appearance='default'
            onClick={() => setIsDetailsModalOpen(true)}
          >
            See details
          </Button>
        )}
      </CallToActions>
      <DetailsDrawer
        dayDate={dayDate}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={event}
        classe={classData}
      />
    </EventContainer>
  );
};

export default Event;
