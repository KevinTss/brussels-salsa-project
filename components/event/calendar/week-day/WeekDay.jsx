import { useEffect, useState } from 'react';

import { useEvents } from '../../../../hooks';
import Event from './event';
import { WeekDayContainer } from './style';

const WeekDay = ({ dayName, classes, dayDate, mondayDate }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const { fetch: fetchEvents, add: addEvent } = useEvents();

  const fetchEventsHandler = () => {
    const dateFromToFetch = new Date(
      dayDate.year(),
      dayDate.month(),
      dayDate.date()
    );
    const endOfWeekDate = mondayDate.add(1, 'week');
    const dateToFetch = new Date(
      endOfWeekDate.year(),
      endOfWeekDate.month(),
      endOfWeekDate.date()
    );
    fetchEvents(dateFromToFetch, dateToFetch).then((data) => {
      setDayEvents(data);
    });
  };

  useEffect(() => {
    fetchEventsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayDate]);

  return (
    <WeekDayContainer>
      <h2>{dayName}</h2>
      <h3>{dayDate.format('DD/MM/YYYY')}</h3>
      <div>
        {classes.map((c) => (
          <Event
            key={c.id}
            classData={c}
            event={dayEvents.find((dayEvent) => c.id === dayEvent.classId)}
            fetchEvents={fetchEventsHandler}
            dayDate={dayDate}
            addEvent={addEvent}
          />
        ))}
      </div>
    </WeekDayContainer>
  );
};

export default WeekDay;
