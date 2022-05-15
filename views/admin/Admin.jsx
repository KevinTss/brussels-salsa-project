import { useState, useEffect } from 'react';

import { Main } from './style';
import { useOnlyAuthGuard, useUsers } from '../../hooks';
import CreateClassDrawer from '../../components/classes/create-class-drawer';
import Calendar from '../../components/event/calendar';
import Cockpit from '../../components/admin/cockpit';
import { AdminView } from '../../types';
import ClassesRecurringList from '../../components/classes/recurring/list';
import EditClassDrawer from '../../components/classes/edit-class-drawer';
import UsersList from '../../components/users/list';

const Home = ({ viewProps }) => {
  const { currentUser } = useOnlyAuthGuard();
  const [isCreateClassDrawerOpen, setIsCreateClassDrawerOpen] = useState(false);
  const [editClassId, setEditClassId] = useState('');
  const { getAll, list } = useUsers();

  useEffect(() => {
    if (!list.length) {
      getAll();
    }
  }, [list, getAll]);

  if (!currentUser?.isAdmin) return null;

  return (
    <Main>
      <Cockpit
        currentView={viewProps}
        onAddClass={() => setIsCreateClassDrawerOpen(true)}
      />
      {viewProps === AdminView.CALENDAR && <Calendar isAdminMode />}
      {viewProps === AdminView.CLASSES && (
        <>
          <ClassesRecurringList
            onEdit={(classeId) => setEditClassId(classeId)}
          />
          <CreateClassDrawer
            isOpen={isCreateClassDrawerOpen}
            onClose={() => setIsCreateClassDrawerOpen(false)}
          />
          <EditClassDrawer
            classeId={editClassId}
            isOpen={!!editClassId}
            onClose={() => setEditClassId('')}
          />
        </>
      )}
      {viewProps === AdminView.USERS && <UsersList />}
    </Main>
  );
};

export default Home;
