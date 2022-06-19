import { FC, useMemo, useCallback } from 'react'

import { Container, DayColumn, Header, Body } from './styles'
import { WeekDay, Day, Dayjs, ClasseEvent } from '../../../../../types'
import {
  weekDayOptions,
  djs,
  getWeekDay,
  getStartWeekDate,
  getEndWeekDate,
} from '../../../../../utils'
import ColumnBody from './column/body'
import ColumnHeader from './column/header'
import { useRangeEvents, useClasses } from '../../../../../hooks'

const days = weekDayOptions.map(o => o.value)

type Props = {
  baseDate?: Dayjs
}

const CalendarWeekView: FC<Props> = ({ baseDate = djs() }) => {
  const data = useMemo(() => ({
    currentWeekDay: getWeekDay(baseDate),
    mondayDate: getStartWeekDate(baseDate),
    sundayDate: getEndWeekDate(baseDate),
  }), [baseDate])
  const { list: events } = useRangeEvents({
    dateFrom: data.mondayDate,
    dateTo: data.sundayDate
  })
  const { list: classes } = useClasses()

  const getEventsByDay = useCallback((date: Dayjs) => events.filter(event => {
    const eventDate = djs(event.date.toDate())

    return eventDate.day() === date.day()
  }), [events])

  const getClassesByDay = useCallback((i: number) => classes.filter(c => {
    return c.day === days[i]
  }), [classes])

  return (
    <Container>
      <Header>
        {days.map((day, index) => renderColumn(true, index))}
      </Header>
      <Body>
        {days.map((day, index) => renderColumn(false, index))}
      </Body>
    </Container>
  )

  function renderColumn(isHeader = false, index = 0) {
    const diff = data.currentWeekDay - index
    const columnDate = baseDate.subtract(diff, 'day')

    if (isHeader) {
      return <DayColumn key={`header-${index}`}>
        <ColumnHeader date={columnDate} />
      </DayColumn>
    }

    return <DayColumn key={`body-${index}`}>
      <ColumnBody
        showHour={!index}
        events={getEventsByDay(columnDate)}
        classes={getClassesByDay(index)}
      />
    </DayColumn>
  }
}

export default CalendarWeekView
