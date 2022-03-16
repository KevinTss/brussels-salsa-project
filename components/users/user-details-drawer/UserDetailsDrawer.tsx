import { useEffect, useState } from 'react';

import { Dialog } from '../../ui';
import { Header } from './style';
import { Title } from '../../../styles/GlobalStyle';
import { useUsers } from '../../../hooks';
import UserForm from '../user-form';
import { User, ClasseLevelEnum } from '../../../types';

type UserDetailsDrawer = {
  userId: string;
  onClose: () => void;
};

export default function UserDetailsDrawer({
  userId,
  onClose,
}: UserDetailsDrawer) {
  const [user, setUser] = useState<User | null>(null);
  const { getById, edit, getAll } = useUsers();

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
          defaultValues={{
            salsaLevel: (user?.levels?.salsa ||
              ClasseLevelEnum.BEGINNER) as ClasseLevelEnum,
            bachataLevel: (user?.levels?.bachata ||
              ClasseLevelEnum.BEGINNER) as ClasseLevelEnum,
          }}
          onSubmit={(values) => {
            if (user?.id) {
              edit(user.id, {
                levels: {
                  salsa: values.salsaLevel,
                  bachata: values.bachataLevel,
                },
              });
              onClose();
              getAll();
            }
          }}
        />
      </Header>
    </Dialog>
  );
}
