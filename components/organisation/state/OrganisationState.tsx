import { Container, Left, Right, OrganisationName } from './styles'
import Logo from '../../ui/logo'

const OrganisationState = () => {
  return (
    <Container>
      <Left>
        <Logo />
      </Left>
      <Right>
        <OrganisationName>
          Bussels Salsa Project
        </OrganisationName>
      </Right>
    </Container>
  )
}

export default OrganisationState
