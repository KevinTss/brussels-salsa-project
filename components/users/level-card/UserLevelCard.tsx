import { FC } from 'react'
import { Badge } from '@chakra-ui/react'

import { Container, LevelRow } from './styles'
import { UserLevel } from '../../../types'
import { getLevelDisplay } from '../../../utils'

const DEFAULT_LEVEL = 0

type Props = {
  levels?: UserLevel
}

const UserLevelCard: FC<Props> = ({ levels }) => {
  const salsaLevel = levels?.salsa || DEFAULT_LEVEL
  const bachataLevel = levels?.bachata || DEFAULT_LEVEL

  return (
    <Container>
      <LevelRow>
        Salsa:
        <Badge
          colorScheme={getBadgeColorScheme(salsaLevel)}
          variant='subtle'
          ml='4px'
        >
          {getLevelDisplay(salsaLevel)}
        </Badge>
      </LevelRow>
      <LevelRow>
        Bachata:
        <Badge
          colorScheme={getBadgeColorScheme(bachataLevel)}
          variant='subtle'
          ml='4px'
        >
          {getLevelDisplay(bachataLevel)}
        </Badge>
      </LevelRow>
    </Container>
  )
}

export default UserLevelCard


type GetBadgeColorSchemeParams = 0 | 1
type GetBadgeColorSchemeReturn = 'gray' | 'purple'

function getBadgeColorScheme(level: GetBadgeColorSchemeParams): GetBadgeColorSchemeReturn {
  // See: https://chakra-ui.com/docs/components/data-display/badge#props
  return [
    'gray' as const,
    'purple' as const
  ][level]
}
