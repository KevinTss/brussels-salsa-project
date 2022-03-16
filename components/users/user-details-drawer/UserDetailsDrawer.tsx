import { useEffect, useState } from 'react';

import { Dialog } from '../../ui';
import { Header } from './style';
import { Title } from '../../../styles/GlobalStyle';
import { useUsers } from '../../../hooks';
import UserForm from '../user-form';
import { ClasseLevelEnum, ClasseTypeEnum, User } from '../../../types';

type UserDetailsDrawer = {
  userId: string;
  onClose: () => void;
};

export default function UserDetailsDrawer({
  userId,
  onClose,
}: UserDetailsDrawer) {
  const [user, setUser] = useState<User | null>(null);
  const { getById, editById } = useUsers();

  useEffect(() => {
    if (userId !== user?.id) {
      setUser(getById(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <Dialog isOpen={!!userId} onClose={onClose} type='aside'>
      <Header>
        <Title>{user?.fullName}</Title>
        <UserForm
          onSubmit={(values) => {
            editById(user?.id, {
              levels: {
                salsa: values.salsaLevel,
                bachata: values.bachataLevel,
              },
            });
            onClose();
          }}
        />
      </Header>
    </Dialog>
  );
}
