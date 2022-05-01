import { Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useAuth } from '../../../hooks';

import { Container, Left, Right } from './styles'

const AdminHeader = () => {
  const { currentUser } = useAuth()

  return (
    <Container>
      <Left>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin'>Admin dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Left>
      <Right>
        <Avatar size='sm' name={currentUser?.fullName} src={currentUser?.avatarUrl || undefined} />
      </Right>
    </Container>
  )
}

export default AdminHeader
