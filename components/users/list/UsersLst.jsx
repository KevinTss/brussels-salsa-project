import { useEffect, useState } from 'react';

import { useUsers } from '../../../hooks';
import { Text } from '../../../styles/GlobalStyle';
import { Button } from '../../ui';
import UserDetailsDrawer from '../user-details-drawer';

export default function UsersList() {
  const [selectedUser, setSelectedUser] = useState('');
  const { getAll, list } = useUsers();

  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {list.map((user) => (
        <div key={user.id}>
          <Text>{user.id}</Text>
          <Button onClick={() => setSelectedUser(user.id)}>Details</Button>
        </div>
      ))}
      <UserDetailsDrawer
        userId={selectedUser}
        onClose={() => setSelectedUser('')}
      />
    </div>
  );
}
