import { useState } from 'react';

import { capitalize, dayjsInstance, CALENDAR_VIEW } from '../../../utils';
import { useClasses } from '../../../hooks';
import { CalendarContainer, WeekContainer } from './style';
import WeekDay from './week-day';
import CalendarCockpit from './cockpit';

const EventsCalendar = ({ isAdminMode }) => {
  const [view] = useState(CALENDAR_VIEW.DAY);
  const [currentDate, setCurrentDate] = useState(dayjsInstance());
  const { list: classes } = useClasses();

  const monday = currentDate.weekday(0).hour(0).minute(0);
  const isMondayInPast = monday.isBefore(dayjsInstance());
  const isMondayIn1Week = monday.isAfter(dayjsInstance().add(7, 'day'));

  const goToNextWeek = () => {
    if (!isAdminMode && isMondayIn1Week) return;

    const nextWeekDate = dayjsInstance(currentDate).add(1, 'week');
    setCurrentDate(nextWeekDate);
  };
  const goToPreviousWeek = () => {
    if (!isAdminMode && isMondayInPast) return;

    const previousWeekDate = dayjsInstance(currentDate).subtract(1, 'week');
    setCurrentDate(previousWeekDate);
  };
  const goToThisWeek = () => setCurrentDate(dayjsInstance());

  return (
    <CalendarContainer>
      <CalendarCockpit
        currentDate={currentDate}
        goToNextWeek={goToNextWeek}
        goToPreviousWeek={goToPreviousWeek}
        goToThisWeek={goToThisWeek}
        isMondayIn1Week={isMondayIn1Week}
        isMondayInPast={isMondayInPast}
        monday={monday}
        view={view}
      />

      {view === CALENDAR_VIEW.WEEK && (
        <WeekContainer>
          {dayjsInstance.weekdays().map((weekDay, dayIndex) => {
            const dayClasses = classes.filter(
              ({ day }) => day === weekDay.toLocaleLowerCase()
            );

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
      )}
    </CalendarContainer>
  );
};

export default EventsCalendar;
