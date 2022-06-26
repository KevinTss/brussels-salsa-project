import { FC } from 'react'

import { Container, AbsoluteContainer, HourCell } from './styles'
import { ClasseEvent, Classe } from '../../../../../../../types'
import EventCell from './EventCell'
import { triggerToast } from '../../../../../../ui'

const hoursArray = [...Array(24).keys()]
const hourRangeToShow = [6, 24]

const onlyDesiredHours = (hour: number) => hour >= hourRangeToShow[0] && hour <= hourRangeToShow[1]

type Props = {
  showHour: boolean,
  events: ClasseEvent[]
  classes: Classe[]
  onEventSelected: (event: ClasseEvent) => void
}
const ColumnBody: FC<Props> = ({
  showHour = false,
  events,
  classes,
  onEventSelected
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
      {
        const ev = events.find(e => e.classId === c.id)

        return (<EventCell
          key={c.id}
          classe={c}
          event={ev}
          hiddenHoursBefore={hourRangeToShow[0]}
          onClick={() => {
            if (ev) {
              onEventSelected(ev)
            } else {
              triggerToast.info(`There are no participants for ${c.type} classe on ${c.day} ${c.time}`)
            }
          }}
        />)
      }
      )}
    </AbsoluteContainer>
  </Container>
}

export default ColumnBody
