import Link from 'next/link';
import { useState } from 'react';

import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import CreateClassDrawer from '../../components/classes/create-class-drawer';
import Calendar from '../../components/event/calendar';
import { Button } from '../../components/ui';

const Home = () => {
  const { currentUser } = useOnlyAuthGuard();
  const [isCreateClassDrawerOpen, setIsCreateClassDrawerOpen] = useState(false);

  if (!currentUser?.isAdmin) return null;

  return (
    <Main>
      <div>Admin</div>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
      <Button onClick={() => setIsCreateClassDrawerOpen(true)}>
        Add class
      </Button>
      <Calendar isAdminMode />
      <CreateClassDrawer
        isOpen={isCreateClassDrawerOpen}
        onClose={() => setIsCreateClassDrawerOpen(false)}
      />
    </Main>
  );
};

export default Home;
