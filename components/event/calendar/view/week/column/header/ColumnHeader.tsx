import { FC } from 'react'

import { Container, DayNumber, DayText } from './ColumnHeader.styles'
import { Dayjs, Day } from '../../../../../../../types'

type Props = {
  date: Dayjs
}
const ColumnHeader: FC<Props> = ({ date }) => {
  return (
    <Container>
      <DayText>{date.format('ddd')}</DayText>
      <DayNumber isHighlight={date.isToday()}>{date.format('DD')}</DayNumber>
    </Container>
  )
}

export default ColumnHeader
