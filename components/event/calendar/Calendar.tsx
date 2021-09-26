import { useState } from 'react';

import { Classe, Weekday } from '../../../types';
import {
  capitalize,
  getMonday,
  getDisplayDate,
  getNextXDayDate,
} from '../../../utils';
import { useClasses } from '../../../hooks';
import { WeekContainer } from './style';
import WeekDay from './week-day';

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { list: classes } = useClasses();

  const mondayDate = getMonday(currentDate);

  return (
    <div>
      {getDisplayDate(mondayDate)}
      <WeekContainer>
        {Object.values(Weekday).map((weekDay, dayIndex) => {
          const dayClasses: Classe[] = classes.filter(
            ({ day }: Classe) => day === weekDay.toLocaleLowerCase()
          );

          if (!dayClasses.length) return null;

          return (
            <WeekDay
              key={weekDay}
              classes={dayClasses}
              dayName={capitalize(weekDay)}
              dayDate={getNextXDayDate(mondayDate, dayIndex)}
            />
          );
        })}
      </WeekContainer>
    </div>
  );
};

export default EventsCalendar;
