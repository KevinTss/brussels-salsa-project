import { useState } from 'react';

import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import CreateClassDrawer from '../../components/classes/create-class-drawer';
import Calendar from '../../components/event/calendar';
import Cockpit from '../../components/admin/cockpit';

const Home = () => {
  const { currentUser } = useOnlyAuthGuard();
  const [isCreateClassDrawerOpen, setIsCreateClassDrawerOpen] = useState(false);

  if (!currentUser?.isAdmin) return null;

  return (
    <Main>
      <Cockpit onAddClass={() => setIsCreateClassDrawerOpen(true)} />
      <Calendar isAdminMode />
      <CreateClassDrawer
        isOpen={isCreateClassDrawerOpen}
        onClose={() => setIsCreateClassDrawerOpen(false)}
      />
    </Main>
  );
};

export default Home;
