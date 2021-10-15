import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';

import { Main } from './style';
import { useAuth } from '../../hooks';
import CreateClassForm from '../../components/classes/create-class-form';

const Home = () => {
  const { currentUser, isLoading } = useAuth();

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
      <CreateClassForm />
      <Link href='/'>
        <a>Back to home</a>
      </Link>
    </Main>
  );
};

export default Home;
