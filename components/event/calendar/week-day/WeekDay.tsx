import { useEffect, useState } from 'react';

import { useEvents } from '../../../../hooks';
import Event from './event';
import { WeekDayContainer } from './style';
import { Event as EventType, Classe as ClasseType } from '../../../../types';

type WeekDayProps = {
  classes: ClasseType[];
  dayDate: Date;
  dayName: string;
};

const WeekDay = ({ dayName, classes, dayDate }: WeekDayProps) => {
  const [dayEvents, setDayEvents] = useState<EventType[]>([]);
  const { fetch: fetchEvents } = useEvents();

  const updateEvents = () =>
    fetchEvents(dayDate).then((data: EventType[]) => setDayEvents(data));

  useEffect(() => {
    updateEvents();
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
            fetchEvents={updateEvents}
            dayDate={dayDate}
          />
        ))}
      </div>
    </WeekDayContainer>
  );
};

export default WeekDay;
