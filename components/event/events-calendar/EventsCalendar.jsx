import { WeekContainer, WeekDay } from './style';

const EventsCalendar = () => {
  const date = new Date();
  let dayOfWeekNumber = date.getDay();

  return (
    <div>
      <WeekContainer>
        {[...Array(7).keys()].map((i) => {
          return <WeekDay key={i}>{i}</WeekDay>;
        })}
      </WeekContainer>
    </div>
  );
};

export default EventsCalendar;
