import { useState } from 'react';

import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import CreateClassDrawer from '../../components/classes/create-class-drawer';
import Calendar from '../../components/event/calendar';
import Cockpit from '../../components/admin/cockpit';
import { AdminView } from '../../types';
import ClassesRecurringList from '../../components/classes/recurring/list';

const Home = () => {
  const { currentUser } = useOnlyAuthGuard();
  const [isCreateClassDrawerOpen, setIsCreateClassDrawerOpen] = useState(false);
  const [view, setView] = useState(AdminView.CALENDAR);

  if (!currentUser?.isAdmin) return null;

  return (
    <Main>
      <Cockpit
        currentView={view}
        onAddClass={() => setIsCreateClassDrawerOpen(true)}
        changeView={setView}
      />
      {view === AdminView.CALENDAR && <Calendar isAdminMode />}
      {view === AdminView.CLASSES && (
        <>
          <ClassesRecurringList />
          <CreateClassDrawer
            isOpen={isCreateClassDrawerOpen}
            onClose={() => setIsCreateClassDrawerOpen(false)}
          />
        </>
      )}
    </Main>
  );
};

export default Home;
