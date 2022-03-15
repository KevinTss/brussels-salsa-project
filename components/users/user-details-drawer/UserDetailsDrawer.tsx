import { useEffect, useState } from 'react';

import { Dialog } from '../../ui';
import { Header } from './style';
import { Title } from '../../../styles/GlobalStyle';
import { useUsers } from '../../../hooks';
import UserForm from '../user-form';
import { ClasseTypeEnum, User } from '../../../types';

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
            const access = user?.access || [];
            const newSalsAccess = `${ClasseTypeEnum.SALSA}-${values.salsaLevel}`;
            const newBachatAccess = `${ClasseTypeEnum.BACHATA}-${values.bachataLevel}`;
            if (!access.includes(newSalsAccess)) access.push(newSalsAccess);
            if (!access.includes(newBachatAccess)) access.push(newBachatAccess);
            editById(user?.id, { classeAccess: access });
          }}
        />
      </Header>
    </Dialog>
  );
}
