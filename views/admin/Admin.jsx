import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';

import { Main } from './style';
import { useAuth } from '../../hooks';
import CreateClassDrawer from '../../components/classes/create-class-drawer';
import { Button } from '../../components/ui';

const Home = () => {
  const { currentUser, isLoading } = useAuth();
  const [isCreateClassDrawerOpen, setIsCreateClassDrawerOpen] = useState(false);

  useEffect(() => {
    if (typeof window === undefined || isLoading) return;

    if (!currentUser) {
      Router.push('/auth');
    } else if (!currentUser?.isAdmin) {
      Router.push('/');
    }
  });

  return (
    <Main>
      <div>Admin</div>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
      <Button onClick={() => setIsCreateClassDrawerOpen(true)}>
        Add class
      </Button>
      <CreateClassDrawer
        isOpen={isCreateClassDrawerOpen}
        onClose={() => setIsCreateClassDrawerOpen(false)}
      />
    </Main>
  );
};

export default Home;
