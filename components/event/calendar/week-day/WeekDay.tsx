import { useEffect, useState } from 'react';

import { useEvents } from '../../../../hooks';
import Event from './event';
import { WeekDayContainer } from './style';
import { Event as EventType } from '../../../../types';

type WeekDayProps = {
  classes: object[];
  dayDate: Date;
  dayName: string;
};

const WeekDay = ({ dayName, classes, dayDate }: WeekDayProps) => {
  const [dayEvents, setDayEvents] = useState([]);
  const { fetch: fetchEvents } = useEvents();

  useEffect(() => {
    fetchEvents(dayDate).then((data: EventType[]) => {
      console.log('data', data);
      // console.log('data 2', data[0].class.get);
      // TODO: write function to fetch all data inside an event (users and class)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WeekDayContainer>
      <h2>{dayName}</h2>
      <div>
        {classes.map((c) => (
          <Event key={c.id} classData={c} />
        ))}
      </div>
    </WeekDayContainer>
  );
};

export default WeekDay;
