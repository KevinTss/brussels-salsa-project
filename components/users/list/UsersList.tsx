import { useEffect, useState } from 'react';

import { useUsers } from '../../../hooks';
import UserDetailsDrawer from '../user-details-drawer';
import UserCard from '../card/UserCard';
import { UsersContainer } from './style';

export default function UsersList() {
  const [selectedUser, setSelectedUser] = useState('');
  const { getAll, list } = useUsers();

  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersContainer>
      {list.map((user) => (
        <UserCard
          key={user.id}
          email={user.email}
          fullName={user.fullName}
          onClick={() => {
            setSelectedUser(user.id);
          }}
          levels={user.levels}
        />
      ))}
      <UserDetailsDrawer
        userId={selectedUser}
        onClose={() => setSelectedUser('')}
      />
    </UsersContainer>
  );
}
