import { useState } from 'react';

import { djs } from '../../../utils';
import { useDayClasses } from '../../../hooks';
import { CalendarContainer } from './style';
import WeekDay from './week-day';
import { CalendarView, WeekDay as WeekDayType } from '../../../types';
import CalendarWeekView from './view/week'

const days: WeekDayType[] = [
  WeekDayType.SUNDAY,
  WeekDayType.MONDAY,
  WeekDayType.TUESDAY,
  WeekDayType.WEDNESDAY,
  WeekDayType.THURSDAY,
  WeekDayType.FRIDAY,
  WeekDayType.SATURDAY,
]

type Props = {
  isAdminMode?: boolean;
};

const EventsCalendar = ({ isAdminMode = false }: Props) => {
  const [view] = useState<CalendarView>(isAdminMode ? CalendarView.WEEK : CalendarView.DAY);
  const [currentDate, setCurrentDate] = useState(djs());
  const dayName = days[currentDate.day()]
  const { list, isLoading } = useDayClasses({ day: dayName });

  return (<CalendarContainer>
    {renderView()}
  </CalendarContainer>)

  function renderView() {
    return view === CalendarView.DAY ? renderDayView() : renderWeekView();
  }

  function renderDayView() {
    if (isLoading) return '...'

    if (!list.length) return 'No classes today'

    return (
      <WeekDay
        classes={list}
        timeScope={CalendarView.DAY}
        dayDate={currentDate}
      />
    )
  }

  function renderWeekView() {
    if (isLoading) return '...'

    return <CalendarWeekView baseDate={currentDate} />
  }
};

export default EventsCalendar;
