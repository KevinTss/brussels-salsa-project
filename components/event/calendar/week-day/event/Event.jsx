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
import {
  dayjsInstance,
  getEventNameDisplay,
  getMalesDancerIds,
  getFemalesDancerIds,
  getTotalDancers,
  getTotalWaitingList,
  getIsUserInDancers,
  getIsUserInWaitingList,
  getNewEvent,
} from '../../../../../utils';
import DetailsDrawer from './details-drawer';

const Event = ({
  classData,
  event,
  fetchEvents,
  fetchEvent,
  dayDate,
  addEvent,
  updateEvent,
  isAdminMode,
}) => {
  const { getById } = useUsers();
  const { currentUser } = useAuth();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const eventDate = dayjsInstance()
    .year(dayDate.year())
    .month(dayDate.month())
    .date(dayDate.date())
    .hour(Number(classData.time.split(':')[0]))
    .minute(Number(classData.time.split(':')[1]));
  const isEventPast = eventDate.isBefore(dayjsInstance());
  const isUserInDancers = getIsUserInDancers(event, currentUser);
  const isUserInWaitingList = getIsUserInWaitingList(event, currentUser);
  const waitingListLength = getTotalWaitingList(event);

  const joinHandle = async () => {
    if (isAdminMode || isEventPast || isUserInDancers || isUserInWaitingList)
      return;

    let newlyFetchedEvent;
    if (event) {
      newlyFetchedEvent = await fetchEvent({ eventId: event.id });
    } else {
      const dateFrom = new Date(
        dayDate.year(),
        dayDate.month(),
        dayDate.date()
      );
      const nextDay = dayDate.add(1, 'day');
      const dateTo = new Date(nextDay.year(), nextDay.month(), nextDay.date());
      newlyFetchedEvent = await fetchEvent({
        classId: classData.id,
        dateFrom,
        dateTo,
      });
    }

    try {
      if (!newlyFetchedEvent) {
        const newEvent = getNewEvent(currentUser);
        await addEvent(newEvent);
        await fetchEvents();

        return;
      } else {
        /**
         * Refetch the event just before update it so we make sure data are
         * up to date at the moment of the action
         */
        const updatedEvent = newlyFetchedEvent;
        const totalDancers = getTotalDancers(updatedEvent);
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
        await updateEvent(updatedEvent.id, updatedEvent);
        await fetchEvents();
      }
    } catch (error) {
      console.warn('error on join', error);
    }
  };

  const cancelHandle = async () => {
    console.log('classData', classData);
    // await fetchEvents();
    // try {
    //   if (!isUserInDancers && !isUserInWaitingList) return;

    //   const currentUserGender = `${currentUser.gender}s`;
    //   const isUserOnWaitingList = !!event.waitingList[currentUserGender].find(
    //     ({ userId }) => userId === currentUser.id
    //   );
    //   const updatedEvent = event;
    //   const list = isUserOnWaitingList ? 'waitingList' : 'dancers';
    //   const userIdIndex = updatedEvent[list][currentUserGender].findIndex(
    //     (userId) => userId === currentUser.id
    //   );
    //   updatedEvent[list][currentUserGender].splice(userIdIndex, 1);
    //   await updateEvent(event.id, updatedEvent);
    //   await fetchEvents();
    // } catch (error) {
    //   console.warn('error on cancel', error);
    // }
  };

  return (
    <EventContainer>
      <EventPrimariesInfo>
        <h4>{getEventNameDisplay(classData.type, classData.level)}</h4>
        {isUserInDancers && <p>Joined</p>}
        {isUserInWaitingList && <p>On waiting list</p>}
        <div>{classData.time}</div>
      </EventPrimariesInfo>
      <DancersContainer $isHidden={!isAdminMode && false}>
        <h4>
          Dancers
          {!!waitingListLength && (
            <span>{waitingListLength} on waiting list</span>
          )}
        </h4>
        <MalesContainer>
          <p>Mens</p>
          <div>
            {getMalesDancerIds(event).map(({ userId }, i) => {
              const user = getById(userId);

              return (
                <Avatar
                  key={`m-${i}`}
                  firstName={user?.fullName?.split(' ')[0]}
                  lastName={user?.fullName?.split(' ')[1]}
                />
              );
            })}
          </div>
        </MalesContainer>
        <FemalesContainer>
          <p>Girls</p>
          <div>
            {getFemalesDancerIds(event).map(({ userId }, i) => {
              const user = getById(userId);

              return (
                <Avatar
                  key={`f-${i}`}
                  firstName={user?.fullName?.split(' ')[0]}
                  lastName={user?.fullName?.split(' ')[1]}
                />
              );
            })}
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
