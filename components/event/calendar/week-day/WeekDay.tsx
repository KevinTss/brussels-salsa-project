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
    fetchEvents(dayDate).then((data: EventType[]) => setDayEvents(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WeekDayContainer>
      <h2>{dayName}</h2>
      <div>
        {classes.map((c) => (
          <Event
            key={c.id}
            classData={c}
            event={dayEvents.find((dayEvent) => c.id === dayEvent.class.id)}
          />
        ))}
      </div>
    </WeekDayContainer>
  );
};

export default WeekDay;
