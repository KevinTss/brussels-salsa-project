import { Container, Box } from './style'
import { Text } from '../../../styles/GlobalStyle'
import { Button } from '../../ui'
import { UserLevel } from '../../../types'
import { getLevelDisplay } from '../../../utils'

type UserCardProps = {
  fullName: string;
  email: string;
  levels?: UserLevel;
  onClick: () => void;
}

export default function UserCard({ email, fullName, levels, onClick }: UserCardProps) {
  return (
    <Container>
      <Box>
        <Text>{fullName}</Text>
        <Text>{email}</Text>
      </Box>
      <Box>
        <Text $isBold>Levels</Text>
        <Text>Salsa: <Text as='span'>{getLevelDisplay(levels?.salsa || 0)}</Text></Text>
        <Text>Bachata: <Text as='span'>{getLevelDisplay(levels?.bachata || 0)}</Text></Text>
      </Box>
      <Box>
        <Button onClick={onClick}>Manage</Button>
      </Box>
    </Container>
  )
}
