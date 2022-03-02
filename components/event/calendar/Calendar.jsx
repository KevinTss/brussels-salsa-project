import { useState } from 'react';

import {
  capitalize,
  djs,
  CALENDAR_VIEW,
  getDisplayDayOfWeek,
} from '../../../utils';
import { useClasses } from '../../../hooks';
import { CalendarContainer, WeekContainer } from './style';
import WeekDay from './week-day';
// import CalendarCockpit from './cockpit';
import { getDayClasses } from './utils';

const EventsCalendar = ({ isAdminMode }) => {
  const [view] = useState(CALENDAR_VIEW.DAY);
  const [currentDate, setCurrentDate] = useState(djs());
  const { list: classes } = useClasses();

  const monday = currentDate.weekday(0).hour(0).minute(0);
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

  return (
    <CalendarContainer>
      {/* <CalendarCockpit
        currentDate={currentDate}
        goToNextWeek={view === CALENDAR_VIEW.WEEK ? goToNextWeek : goToNextDay}
        goToPreviousWeek={
          view === CALENDAR_VIEW.WEEK ? goToPreviousWeek : goToPreviousDay
        }
        goToThisWeek={goToThisWeek}
        isNextDisabled={isMondayIn1Week}
        isPreviousDisabled={isMondayInPast}
        monday={monday}
        view={view}
      /> */}

      {view === CALENDAR_VIEW.WEEK ? (
        <WeekContainer>
          {djs.weekdays().map((weekDay, dayIndex) => {
            const dayClasses = getDayClasses(classes, weekDay);

            if (!dayClasses.length) return null;

            const offsetDays = dayIndex - 1;

            return (
              <WeekDay
                key={weekDay}
                classes={dayClasses}
                dayName={capitalize(weekDay)}
                dayDate={offsetDays ? monday.add(offsetDays, 'day') : monday}
                isAdminMode={isAdminMode}
              />
            );
          })}
        </WeekContainer>
      ) : (
        <WeekDay
          classes={getDayClasses(classes, getDisplayDayOfWeek(currentDate))}
          dayName={capitalize(getDisplayDayOfWeek(currentDate))}
          dayDate={currentDate}
        />
      )}
    </CalendarContainer>
  );
};

export default EventsCalendar;
