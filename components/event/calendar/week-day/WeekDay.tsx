import { useEffect, useState } from 'react';

import { useEvents } from '../../../../hooks';
import Event from './event';
import { WeekDayContainer } from './style';
import { Classe, WeekDay as WeekDayType, ClasseEvent } from '../../../../types'
import { Dayjs } from 'dayjs';

const byClasseTime = (a: Classe, b: Classe) => (a.time).localeCompare(b.time)

type Props = {
  dayName: WeekDayType
  classes: Classe[],
  dayDate: Dayjs,
  isAdminMode?: boolean
}

const WeekDay = ({ dayName, classes, dayDate, isAdminMode = false }: Props) => {
  const [dayEvents, setDayEvents] = useState<ClasseEvent[]>([]);
  const {
    fetch: fetchEvents,
    fetchOne: fetchEvent,
    add: addEvent,
    update: updateEvent,
  } = useEvents();

  const fetchEventsHandler: () => Promise<ClasseEvent[]> = async () => {
    const dateFromToFetch = new Date(
      dayDate.year(),
      dayDate.month(),
      dayDate.date()
    );
    const endOfWeekDate = dayDate.add(1, 'day');
    const dateToFetch = new Date(
      endOfWeekDate.year(),
      endOfWeekDate.month(),
      endOfWeekDate.date()
    );
    const data = await fetchEvents(dateFromToFetch, dateToFetch);
    console.group();
    console.warn('Event fetched');
    console.warn('Date from', dateFromToFetch.toISOString());
    console.warn('Date to', dateToFetch.toISOString());
    console.warn('Data', data);
    console.groupEnd();
    setDayEvents(data);

    return data
  };

  useEffect(() => {
    fetchEventsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayDate]);

  return (
    <WeekDayContainer>
      <h2>
        {dayName} - {dayDate.format('DD/MM/YYYY')}
      </h2>
      <div>
        {!!classes.length ? (
          classes.sort(byClasseTime).map((c) => (
            <Event
              key={c.id}
              classData={c}
              event={dayEvents.find((dayEvent) => c.id === dayEvent.classId)}
              fetchEvents={fetchEventsHandler}
              fetchEvent={fetchEvent}
              dayDate={dayDate}
              addEvent={addEvent}
              updateEvent={updateEvent}
              isAdminMode={isAdminMode}
            />
          ))
        ) : (
          <p>No class today</p>
        )}
      </div>
    </WeekDayContainer>
  );
};

export default WeekDay;
