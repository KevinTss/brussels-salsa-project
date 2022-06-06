import Link from 'next/link';
import { useRouter } from 'next/router'

import { Container, MenuContainer, MenuItem } from './styles'
import OrganisationState from '../../organisation/state'

const AdminSideMenu = () => {
  const router = useRouter()

  return (
    <Container>
      <OrganisationState />
      <MenuContainer>
        <Link href='/admin/users' passHref>
          {/* @ts-ignore */}
          <MenuItem as='a' isActive={router.pathname === '/admin/users'}>
            Users
          </MenuItem>
        </Link>
        <Link href='/admin/classes' passHref>
          {/* @ts-ignore */}
          <MenuItem as='a' isActive={router.pathname === '/admin/classes'}>
            Classes
          </MenuItem>
        </Link>
        <Link href='/admin/calendar' passHref>
          {/* @ts-ignore */}
          <MenuItem as='a' isActive={router.pathname === '/admin/calendar'}>
            Calendar
          </MenuItem>
        </Link>
      </MenuContainer>
    </Container>
  )
}

export default AdminSideMenu
