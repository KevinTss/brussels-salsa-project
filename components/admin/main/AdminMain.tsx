import { FC } from 'react'

import { Container, Content } from './styles'
import AdminHeader from '../header'

const AdminMain: FC = ({ children }) => {
  return (
    <Container>
      <AdminHeader />
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default AdminMain
