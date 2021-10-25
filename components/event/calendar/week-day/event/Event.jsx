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
  const { getById } = useUsers();
  const { currentUser } = useAuth();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const males = event
    ? event.dancers.males.map((dancer) => getById(dancer.userId))
    : [];
  const females = event
    ? event.dancers.females.map((dancer) => getById(dancer.userId))
    : [];
  const eventDate = dayjsInstance()
    .year(dayDate.year())
    .month(dayDate.month())
    .date(dayDate.date())
    .hour(Number(classData.time.split(':')[0]))
    .minute(Number(classData.time.split(':')[1]));
  const isEventPast = eventDate.isBefore(dayjsInstance());

  let isUserInDancers = false;
  let isUserInWaitingList = false;
  if (!isAdminMode) {
    isUserInDancers =
      currentUser?.gender === 'male'
        ? !!event?.dancers?.males?.find(
            ({ userId }) => userId === currentUser.id
          )
        : !!event?.dancers?.females?.find(
            ({ userId }) => userId === currentUser.id
          );
    isUserInWaitingList =
      currentUser?.gender === 'male'
        ? !!event?.waitingList?.males?.find(
            ({ userId }) => userId === currentUser.id
          )
        : !!event?.waitingList?.females?.find(
            ({ userId }) => userId === currentUser.id
          );
  }

  let waitingListLength =
    (event?.waitingList?.males?.length || 0) +
    (event?.waitingList?.females?.length || 0);

  const joinHandle = async () => {
    if (isAdminMode || isEventPast) return;

    await fetchEvents();

    try {
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
          waitingList: {
            males: [],
            females: [],
          },
          date: dayDate.hour(0).minute(0).second(0).toDate(),
        };
        await addEvent(newEvent);
        await fetchEvents();
        return;
      } else if (isUserInDancers || isUserInWaitingList) {
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
        } else if (
          classData?.spots?.max &&
          totalDancers >= classData.spots.max
        ) {
          // Add the user to the waiting list
          updatedEvent.waitingList[`${currentUser.gender}s`].push({
            joinOn: new Date(),
            userId: currentUser.id,
          });
        }
        await updateEvent(event.id, updatedEvent);
        await fetchEvents();
      }
    } catch (error) {
      console.warn('error on join', error);
    }
  };

  const cancelHandle = async () => {
    await fetchEvents();
    try {
      if (!isUserInDancers && !isUserInWaitingList) return;

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
      await updateEvent(event.id, updatedEvent);
      await fetchEvents();
    } catch (error) {
      console.warn('error on cancel', error);
    }
  };

  return (
    <EventContainer>
      <EventPrimariesInfo>
        <h4>{getEventNameDisplay(classData.type, classData.level)}</h4>
        {isUserInDancers && <p>Joined</p>}
        {isUserInWaitingList && <p>On waiting list</p>}
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
        {!isAdminMode &&
          !isUserInDancers &&
          !isUserInWaitingList &&
          !isEventPast && (
            <Button appearance='primary' onClick={joinHandle}>
              Join
            </Button>
          )}
        {!isAdminMode &&
          !isUserInDancers &&
          !isUserInWaitingList &&
          isEventPast && (
            <Button appearance='minimal' isDisabled>
              Past
            </Button>
          )}
        {!isAdminMode && (isUserInDancers || isUserInWaitingList) && (
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
      {isAdminMode && (
        <DetailsDrawer
          dayDate={dayDate}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          event={event}
          classe={classData}
        />
      )}
    </EventContainer>
  );
};

export default Event;
