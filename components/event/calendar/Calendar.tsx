import { useState } from 'react';

import { djs } from '../../../utils';
import { useDayClasses } from '../../../hooks';
import { CalendarContainer } from './style';
import WeekDay from './week-day';
import { CalendarView, WeekDay as WeekDayType } from '../../../types';

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

  // const monday = currentDate.weekday(0).hour(0).minute(0);
  // const isMondayInPast = monday.isBefore(djs());
  // const isMondayIn1Week = monday.isAfter(djs().add(7, 'day'));

  // const goToNextWeek = () => {
  //   if (!isAdminMode && isMondayIn1Week) return;

  //   const nextWeekDate = djs(currentDate).add(1, 'week');
  //   setCurrentDate(nextWeekDate);
  // };
  // const goToPreviousWeek = () => {
  //   if (!isAdminMode && isMondayInPast) return;

  //   const previousWeekDate = djs(currentDate).subtract(1, 'week');
  //   setCurrentDate(previousWeekDate);
  // };
  // const goToThisWeek = () => setCurrentDate(djs());
  // const goToNextDay = () => {
  //   const nextDayDate = djs(currentDate).add(1, 'day');
  //   setCurrentDate(nextDayDate);
  // };
  // const goToPreviousDay = () => {
  //   const previousDayDate = djs(currentDate).subtract(1, 'day');
  //   setCurrentDate(previousDayDate);
  // };


  return (<CalendarContainer>
    {renderView()}
  </CalendarContainer>)

  function renderView() {
    return view === CalendarView.DAY ? renderDayView() : null;
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

  // return (
  //   <CalendarContainer>
  //     {view === CalendarView.WEEK && (
  //       <CalendarCockpit
  //         currentDate={currentDate}
  //         goToNextWeek={goToNextWeek}
  //         goToPreviousWeek={goToPreviousWeek}
  //         goToThisWeek={goToThisWeek}
  //         // isNextDisabled={isMondayIn1Week}
  //         // isPreviousDisabled={isMondayInPast}
  //         monday={monday}
  //         view={view} isNextDisabled={false} isPreviousDisabled={false} />
  //     )}

  //     {view === CalendarView.WEEK ? (
  //       <WeekContainer>
  //         {Object.values(WeekDayType).map((weekDay, dayIndex) => {
  //           const dayClasses = getDayClasses(classes, weekDay);

  //           if (!dayClasses.length) return null;

  //           const offsetDays = dayIndex - 1;

  //           return (
  //             <WeekDay
  //               key={weekDay}
  //               classes={dayClasses}
  //               dayName={weekDay}
  //               dayDate={offsetDays ? monday.add(offsetDays, 'day') : monday}
  //               isAdminMode={isAdminMode}
  //             />
  //           );
  //         })}
  //       </WeekContainer>
  //     ) : (
  //       <WeekDay
  //         classes={getDayClasses(classes, getDisplayDayOfWeek(currentDate))}
  //           dayName={getDisplayDayOfWeek(currentDate)}
  //           dayDate={currentDate} isAdminMode={undefined} />
  //     )}
  //   </CalendarContainer>
  // );
};

export default EventsCalendar;
