import React from 'react';

import {
  EventContainer,
  DancersContainer,
  MalesContainer,
  FemalesContainer,
  SubTitle,
} from './style';
import { useUsers, useEvents, useAuth } from '../../../../../hooks';
import { Button, Avatar } from '../../../../ui';
import { isAfterNow } from '../../../../../utils';

// const getMaleDancers = (event) => {

// }

const Event = ({ classData, event, fetchEvents, dayDate }) => {
  const { getById, list } = useUsers();
  const { add: addEvent } = useEvents();
  const { currentUser } = useAuth();

  const males = event ? event.dancers.males.map((m) => getById(m.id)) : [];
  const females = event ? event.dancers.females.map((m) => getById(m.id)) : [];

  const joinHandle = async () => {
    // Check if event is still in the future
    // const eventDate = event.date.toDate();
    const d = new Date(
      dayDate.getFullYear(),
      dayDate.getMonth(),
      dayDate.getDate(),
      Number(classData.time.split(':')[0]), // Hours
      Number(classData.time.split(':')[1]) // Minutes
    );

    console.log('classDate', classData);

    if (!isAfterNow(d)) {
      // Error
      console.log('event is in the past');
      return;
    }

    if (!event) {
      // TODO: https://firebase.google.com/docs/storage/web/create-reference

      // create one
      console.log('no-event');
      const newEvent = {
        class: `/classes/${classData.id}`,
        dancers: {
          males: [],
          females: [],
        },
        date: dayDate,
      };
      newEvent.dancers[
        currentUser.gender === 'male' ? 'males' : 'females'
      ].push(`/users/${currentUser.id}`);
      // console.log('currentUser', currentUser);
      // console.log('new Event', newEvent);
      await addEvent(newEvent);
      // refetch
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

  return (
    <EventContainer>
      {classData.type} {classData.level}: {classData.time}
      <Button onClick={joinHandle}>Join</Button>
      <DancersContainer>
        <SubTitle>Dancers</SubTitle>
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
    </EventContainer>
  );
};

export default Event;
