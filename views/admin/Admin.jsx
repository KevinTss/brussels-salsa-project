import { Main } from './style';
import { useOnlyAuthGuard } from '../../hooks';
import Calendar from '../../components/event/calendar';
import { AdminView } from '../../types';

import UsersList from '../../components/users/list';
import ClasseList from '../../components/classes/list';
import ClasseAdminCockpit from '../../components/classes/admin-cockpit';

const Home = ({ viewProps }) => {
  const { currentUser } = useOnlyAuthGuard();

  if (!currentUser?.isAdmin) return null;

  return <Main>{renderContent()}</Main>;

  function renderContent() {
    switch (viewProps) {
      case AdminView.CALENDAR:
        return <Calendar isAdminMode />;
      case AdminView.CLASSES:
        return (
          <>
            <ClasseAdminCockpit />
            <ClasseList />
          </>
        );
      case AdminView.USERS:
        return (
          <>
            <UsersList />
          </>
        );
      default:
        return null;
    }
  }
};

export default Home;
