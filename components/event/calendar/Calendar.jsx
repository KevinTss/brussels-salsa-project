import { useState } from 'react';

import { capitalize, dayjsInstance } from '../../../utils';
import { useClasses } from '../../../hooks';
import {
  CalendarContainer,
  CockpitContainer,
  DayDateContainer,
  WeekContainer,
} from './style';
import WeekDay from './week-day';
import { Button } from '../../ui';

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjsInstance());
  const { list: classes } = useClasses();

  const monday = currentDate.weekday(0);

  const goToNextWeek = () => {
    const nextWeekDate = dayjsInstance(currentDate).add(1, 'week');
    setCurrentDate(nextWeekDate);
  };

  const goToPreviousWeek = () => {
    const previousWeekDate = dayjsInstance(currentDate).subtract(1, 'week');
    setCurrentDate(previousWeekDate);
  };

  return (
    <CalendarContainer>
      <CockpitContainer>
        <Button
          appearance='primary'
          onClick={goToPreviousWeek}
          iconLeft='angle-right'
          isIconReverse
        >
          Previous week
        </Button>
        <DayDateContainer>
          {currentDate.format('dddd DD, MMMM YYYY')}
        </DayDateContainer>
        <Button
          appearance='primary'
          onClick={goToNextWeek}
          iconRight='angle-right'
        >
          Next week
        </Button>
      </CockpitContainer>

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
              mondayDate={monday}
            />
          );
        })}
      </WeekContainer>
    </CalendarContainer>
  );
};

export default EventsCalendar;
