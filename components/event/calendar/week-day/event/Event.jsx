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

const Event = ({ classData, event, fetchEvents, dayDate, addEvent }) => {
  const { getById, list } = useUsers();
  const { currentUser } = useAuth();

  const males = event
    ? event.dancers.males.map((maleId) => getById(maleId))
    : [];
  const females = event
    ? event.dancers.females.map((femaleId) => getById(femaleId))
    : [];

  const joinHandle = async () => {
    // Check if event is still in the future
    const eventDate = dayjsInstance()
      .year(dayDate.year())
      .month(dayDate.month())
      .date(dayDate.date())
      .hour(Number(classData.time.split(':')[0]))
      .minute(Number(classData.time.split(':')[1]));
    // console.log('d', eventDate.format('DD/MM/YYYY - HH:mm'));

    // Error if event in past from now
    if (eventDate.isBefore(dayjsInstance())) {
      // Error
      console.log('event is in the past');
      return;
    }

    /**
     * If no event we create one
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
      // refetch to keep of to date
      fetchEvents();
      return;
    } else {
      // Check is user is not already in
      console.log('hey', males);
      // Check if slot are not overflow
      // Check if balance is respected
    }
    console.log('wanna join class', classData.id);
    console.log('event', event);
  };

  const cancelHandle = () => {
    console.log('want to cancel');
  };

  const isUserAlreadyInEvent =
    currentUser.gender === 'male'
      ? !!event?.dancers?.males?.find((maleId) => maleId === currentUser.id)
      : !!event?.dancers?.females?.find(
          (femaleId) => femaleId === currentUser.id
        );

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
