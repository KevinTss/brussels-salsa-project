import { Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRouter } from 'next/router'

import { Container, Left, Right } from './styles'
import { capitalize } from '../../../utils';
import { RoutePaths } from '../../../types';
import AuthState from '../../auth/auth-state/AuthState';

function getLastBreadcrumbLabel(path: string): string {
  const [, , lastPath] = path.split('/')

  return capitalize(lastPath)
}
function getLastBreadcrumbHref(path: string): RoutePaths {
  const [, , lastPath] = path.split('/')

  const links: Record<string, RoutePaths> = {
    users: RoutePaths.ADMIN_USERS,
    calendar: RoutePaths.ADMIN_CALENDAR,
    classe: RoutePaths.ADMIN_CLASSES,
  }

  return links[lastPath]
}

const AdminHeader = () => {
  const { pathname } = useRouter()

  return (
    <Container>
      <Left>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={getLastBreadcrumbHref(pathname)}>
              {getLastBreadcrumbLabel(pathname)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Left>
      <Right>
        <AuthState />
      </Right>
    </Container>
  )
}

export default AdminHeader
