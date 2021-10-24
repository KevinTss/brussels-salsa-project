import { useState } from 'react';

import { capitalize, dayjsInstance } from '../../../utils';
import { useClasses } from '../../../hooks';
import {
  CalendarContainer,
  CockpitContainer,
  DayDateContainer,
  WeekContainer,
  CTAs,
} from './style';
import WeekDay from './week-day';
import { Button } from '../../ui';

const EventsCalendar = ({ isAdminMode }) => {
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
      <CockpitContainer>
        <DayDateContainer>
          Week of {monday.format('dddd DD, MMMM YYYY')}
        </DayDateContainer>
        <CTAs>
          <Button
            appearance='primary'
            onClick={goToPreviousWeek}
            iconLeft='angle-right'
            isIconReverse
            isDisabled={!isAdminMode && isMondayInPast}
          >
            Previous week
          </Button>
          <Button
            appearance='primary'
            onClick={goToThisWeek}
            isDisabled={
              currentDate.weekday(0).hour(0).minute(0).format('DD/MM/YYYY') ===
              dayjsInstance().weekday(0).hour(0).minute(0).format('DD/MM/YYYY')
            }
          >
            This week
          </Button>
          <Button
            appearance='primary'
            onClick={goToNextWeek}
            iconRight='angle-right'
            isDisabled={!isAdminMode && isMondayIn1Week}
          >
            Next week
          </Button>
        </CTAs>
        <CTAs $onlyMobile>
          <Button
            appearance='primary'
            onClick={goToPreviousWeek}
            iconLeft='angle-right'
            isIconReverse
            isDisabled={!isAdminMode && isMondayInPast}
          />
          <Button
            appearance='primary'
            onClick={goToThisWeek}
            isDisabled={
              currentDate.weekday(0).hour(0).minute(0).format('DD/MM/YYYY') ===
              dayjsInstance().weekday(0).hour(0).minute(0).format('DD/MM/YYYY')
            }
          >
            This week
          </Button>
          <Button
            appearance='primary'
            onClick={goToNextWeek}
            iconRight='angle-right'
            isDisabled={!isAdminMode && isMondayIn1Week}
          />
        </CTAs>
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
              isAdminMode={isAdminMode}
            />
          );
        })}
      </WeekContainer>
    </CalendarContainer>
  );
};

export default EventsCalendar;
