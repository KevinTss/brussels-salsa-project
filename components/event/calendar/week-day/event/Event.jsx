import React from 'react';

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

const Event = ({
  classData,
  event,
  fetchEvents,
  dayDate,
  addEvent,
  updateEvent,
}) => {
  const { getById, list } = useUsers();
  const { currentUser } = useAuth();

  const males = event
    ? event.dancers.males.map((dancer) => getById(dancer.userId))
    : [];
  const females = event
    ? event.dancers.females.map((dancer) => getById(dancer.userId))
    : [];

  const isUserAlreadyInEvent =
    currentUser.gender === 'male'
      ? !!event?.dancers?.males?.find((maleId) => maleId === currentUser.id)
      : !!event?.dancers?.females?.find(
          (femaleId) => femaleId === currentUser.id
        );

  const joinHandle = async () => {
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
          males: currentUser.gender === 'male' ? [currentUser.id] : [],
          females: currentUser.gender === 'female' ? [currentUser.id] : [],
        },
        date: dayDate.hour(0).minute(0).second(0).toDate(),
      };
      await addEvent(newEvent);
      /**
       * refetch to keep of to date
       */
      // TODO: remove when we add real-time
      fetchEvents();
      return;
    } else if (isUserAlreadyInEvent) {
      // TODO: display toast error
    } else {
      const baseAvailableSpots = classData.baseSpots;
      if (males.length + females.length < baseAvailableSpots) {
        /**
         * No need to check balance since we allow 5 for each gender without
         * check the balance
         */
        const updatedEvent = event;
        const currentUserGender = `${currentUser.gender}s`;
        updatedEvent.dancers[currentUserGender].push(currentUser.id);
        updateEvent(event.id, updatedEvent);
        fetchEvents();
      } else if (true /** // TODO: Max spot if not reach */) {
        /**
         * We need to check is
         */
      } else {
        /**
         * @todo check balance
         */
      }
    }
  };

  const cancelHandle = () => {
    if (!isUserAlreadyInEvent) {
      /**
       * @todo show error toast
       */
    }
    const updatedEvent = event;
    const currentUserGender = `${currentUser.gender}s`;
    const userIdIndex = updatedEvent.dancers[currentUserGender].findIndex(
      (userId) => userId === currentUser.id
    );
    updatedEvent.dancers[currentUserGender].splice(userIdIndex, 1);
    updateEvent(event.id, updatedEvent);
    fetchEvents();
  };

  return (
    <EventContainer>
      <EventPrimariesInfo>
        <h4>{getEventNameDisplay(classData.type, classData.level)}</h4>
        <div>{classData.time}</div>
      </EventPrimariesInfo>
      <DancersContainer>
        <h4>Dancers</h4>
        <MalesContainer>
          <p>Mens</p>
          {males.map((m, i) => (
            <Avatar
              key={`m-${i}`}
              firstName={m?.fullName?.split(' ')[0]}
              lastName={m?.fullName?.split(' ')[1]}
            />
          ))}
        </MalesContainer>
        <FemalesContainer>
          <p>Girls</p>
          {females.map((f, i) => (
            <Avatar
              key={`f-${i}`}
              firstName={f?.fullName?.split(' ')[0]}
              lastName={f?.fullName?.split(' ')[1]}
            />
          ))}
        </FemalesContainer>
      </DancersContainer>
      <CallToActions>
        {!isUserAlreadyInEvent && (
          <Button appearance='primary' onClick={joinHandle}>
            Join
          </Button>
        )}
        {isUserAlreadyInEvent && (
          <Button appearance='minimal' onClick={cancelHandle}>
            Cancel
          </Button>
        )}
      </CallToActions>
    </EventContainer>
  );
};

export default Event;
