import { Container, MenuContainer, MenuItem } from './styles'
import OrganisationState from '../../organisation/state'


const AdminSideMenu = () => {
  return (
    <Container>
      <OrganisationState />
      <MenuContainer>
        <MenuItem>
          Users
        </MenuItem>
        <MenuItem>
          Classes
        </MenuItem>
        <MenuItem>
          Calendar
        </MenuItem>
      </MenuContainer>
    </Container>
  )
}

export default AdminSideMenu
