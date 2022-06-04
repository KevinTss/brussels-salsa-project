import { FC } from 'react';

import { useEvents } from '../../../../hooks';
import Event from './event';
import { WeekDayContainer } from './style';
import { Classe, CalendarView, Dayjs } from '../../../../types'

const byTime = (a: Classe, b: Classe) => (a.time).localeCompare(b.time)

type getTimeScopeDatesReturn = {
  dateFrom: Dayjs,
  dateTo: Dayjs,
}
const getTimeScopeDates = (currentDate: Dayjs, timeScope: CalendarView): getTimeScopeDatesReturn => {
  let dateFrom = currentDate.hour(0).minute(0).second(0).millisecond(0)
  let dateTo = dateFrom.add(1, 'day')

  return {
    dateFrom,
    dateTo,
  }
}

type Props = {
  classes: Classe[],
  dayDate: Dayjs,
  timeScope: CalendarView
}

const WeekDay: FC<Props> = ({ classes, dayDate, timeScope }) => {
  const { list, refetch } = useEvents({
    classeIds: classes.map(c => c.id),
    ...getTimeScopeDates(dayDate, timeScope)
  })

  if (!classes?.length) return null

  return (
    <WeekDayContainer>
      <h2>
        {dayDate.format('ddd DD MMM YYYY')}
      </h2>
      <div>
        {classes.sort(byTime).map((classe) => (
          <Event
            key={classe.id}
            classData={classe}
            event={list.find(event => event.classId === classe.id)}
            refetchEvents={refetch}
            dayDate={dayDate}
          />
        ))}
      </div>
    </WeekDayContainer>
  );
};

export default WeekDay;
