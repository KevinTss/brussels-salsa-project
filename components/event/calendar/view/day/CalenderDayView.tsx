import { FC } from 'react'

import WeekDay from '../../week-day';
import { useDayClasses } from '../../../../../hooks';
import { CalendarView, Dayjs } from '../../../../../types';
import { djs, days } from '../../../../../utils';


type Props = {
  baseDate?: Dayjs
}

const CalenderDayView: FC<Props> = ({ baseDate = djs() }) => {
  const dayName = days[baseDate.day()]
  const { list, isLoading } = useDayClasses({ day: dayName });

  if (isLoading) return <p>...</p>

  if (!list.length) return <p>No classes today</p>

  return (
    <WeekDay
      classes={list}
      timeScope={CalendarView.DAY}
      dayDate={baseDate}
    />
  )
}

export default CalenderDayView
