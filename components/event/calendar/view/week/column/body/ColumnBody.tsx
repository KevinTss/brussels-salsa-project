import { FC } from 'react'

import { Container, AbsoluteContainer, HourCell } from './styles'
import { ClasseEvent, Classe } from '../../../../../../../types'
import EventCell from './EventCell'

const hoursArray = [...Array(24).keys()]
const hourRangeToShow = [6, 24]

const onlyDesiredHours = (hour: number) => hour >= hourRangeToShow[0] && hour <= hourRangeToShow[1]

type Props = {
  showHour: boolean,
  events: ClasseEvent[]
  classes: Classe[]
}
const ColumnBody: FC<Props> = ({
  showHour = false,
  events,
  classes
}) => {
  return <Container>
    <AbsoluteContainer>
      {hoursArray
        .filter(onlyDesiredHours)
        .map(hourCell =>
          <HourCell
            key={hourCell}
            hour={showHour ? hourCell : undefined}
          />
        )
      }
    </AbsoluteContainer>
    <AbsoluteContainer>
      {classes.map(c =>
        <EventCell
          key={c.id}
          classe={c}
          // classe={classes.find(c => c.id === event.classId)}
          event={events.find(e => e.classId === c.id)}

          hiddenHoursBefore={hourRangeToShow[0]}
        />
      )}
    </AbsoluteContainer>
  </Container>
}

export default ColumnBody
