import Router from 'next/router';

import { Container, CTAs } from './style';
import { Button } from '../../ui';
import { SubTitle } from '../../../styles/GlobalStyle';
import { AdminView } from '../../../types';

const Cockpit = ({ onAddClass, changeView, currentView }) => (
  <Container>
    <SubTitle>Admin dashboard</SubTitle>
    <CTAs>
      <Button onClick={() => Router.push('/')} appearance='minimal'>
        Back to home
      </Button>
      {currentView === AdminView.CALENDAR && (
        <Button
          onClick={() => changeView(AdminView.CLASSES)}
          appearance='minimal'
        >
          Classes
        </Button>
      )}
      {currentView === AdminView.CLASSES && (
        <>
          <Button onClick={onAddClass} appearance='minimal'>
            Add new recurring class
          </Button>
          <Button
            onClick={() => changeView(AdminView.CALENDAR)}
            appearance='minimal'
          >
            Calendar
          </Button>
        </>
      )}
    </CTAs>
  </Container>
);

export default Cockpit;
