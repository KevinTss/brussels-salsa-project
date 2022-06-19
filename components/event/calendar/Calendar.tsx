import { useState } from 'react';

import { djs } from '../../../utils';
import { CalendarContainer } from './style';
import { CalendarView } from '../../../types';
import CalendarWeekView from './view/week'
import CalendarDayView from './view/day'

type Props = {
  isAdminMode?: boolean;
};

const EventsCalendar = ({ isAdminMode = false }: Props) => {
  const [view] = useState<CalendarView>(isAdminMode ? CalendarView.WEEK : CalendarView.DAY);
  const [currentDate, setCurrentDate] = useState(djs());

  return (<CalendarContainer>
    {renderView()}
  </CalendarContainer>)

  function renderView() {
    switch (view) {
      case CalendarView.DAY:
        return <CalendarDayView baseDate={currentDate} />
      case CalendarView.WEEK:
        return <CalendarWeekView baseDate={currentDate} />
      default:
        return null
    }
  }

};

export default EventsCalendar;
