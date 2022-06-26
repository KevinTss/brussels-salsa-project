import { FC } from 'react'

import { Container, Text } from './EventCell.styles'
import { ClasseEvent, Classe } from '../../../../../../../../types'
import { capitalize, getLevelDisplay, getTotalDancers } from '../../../../../../../../utils'

type Props = {
  event?: ClasseEvent,
  classe: Classe,
  hiddenHoursBefore: number,
  onClick: () => void
}
const EventCell: FC<Props> = ({ event, hiddenHoursBefore, classe, onClick }) => {
  const [hour, minutes] = classe.time.split(':')
  let offset = Number(hour)
  if (Number(minutes) === 30) {
    offset += 0.5
  }
  offset -= hiddenHoursBefore
  const participants = event ? getTotalDancers(event) : 0

  return (
    <Container offset={offset} onClick={onClick}>
      <Text>{`${capitalize(classe.type)} ${getLevelDisplay(classe.level).toLowerCase()}`}</Text>
      {!!participants && <Text>{`${participants} participant${participants > 1 ? 's' : ''}`}</Text>}
    </Container>
  )
}

export default EventCell
