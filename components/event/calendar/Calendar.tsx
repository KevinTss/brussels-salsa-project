import { useState } from 'react';

import { ClasseType } from '../../../types';
import { capitalize, dayjsInstance } from '../../../utils';
import { useClasses } from '../../../hooks';
import { WeekContainer } from './style';
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
    <div>
      Current: {currentDate.format('DD/MM/YYYY')}
      <br />
      Monday: {monday.format('DD/MM/YYYY')}
      <br />
      <Button appearance='primary' onClick={goToPreviousWeek}>
        Previous Week
      </Button>
      <Button appearance='primary' onClick={goToNextWeek}>
        Next Week
      </Button>
      <WeekContainer>
        {dayjsInstance.weekdays().map((weekDay, dayIndex) => {
          const dayClasses: ClasseType[] = classes.filter(
            ({ day }: ClasseType) => day === weekDay.toLocaleLowerCase()
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
    </div>
  );
};

export default EventsCalendar;
