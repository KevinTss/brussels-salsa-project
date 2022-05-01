import Link from 'next/link';

import { Container, MenuContainer, MenuItem } from './styles'
import OrganisationState from '../../organisation/state'

const AdminSideMenu = () => {
  return (
    <Container>
      <OrganisationState />
      <MenuContainer>
        <Link href='/admin/users' passHref>
          {/* @ts-ignore */}
          <MenuItem as='a'>
            Users
          </MenuItem>
        </Link>
        <Link href='/admin/classes' passHref>
          {/* @ts-ignore */}
          <MenuItem as='a'>
            Classes
          </MenuItem>
        </Link>
        <Link href='/admin/calendar' passHref>
          {/* @ts-ignore */}
          <MenuItem as='a'>
            Calendar
          </MenuItem>
        </Link>
      </MenuContainer>
    </Container>
  )
}

export default AdminSideMenu
