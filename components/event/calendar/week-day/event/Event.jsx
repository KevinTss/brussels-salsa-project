import React from 'react';

import {
  EventContainer,
  DancersContainer,
  MalesContainer,
  FemalesContainer,
  SubTitle,
} from './style';
import { useUsers } from '../../../../../hooks';
import { Button, Avatar } from '../../../../ui';

const Event = ({ classData, event }) => {
  const { getById, list } = useUsers();

  const joinHandle = (e) => {
    console.log('wanna join class', classData.id);
    console.log('event', event);
  };

  const males = event ? event.dancers.males.map((m) => getById(m.id)) : [];
  const females = event ? event.dancers.females.map((m) => getById(m.id)) : [];

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
