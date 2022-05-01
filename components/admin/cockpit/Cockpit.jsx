import { Container, CTAs } from './style';
import { Button } from '../../ui';
import { SubTitle } from '../../../styles/GlobalStyle';
import { AdminView } from '../../../types';

const Cockpit = ({ onAddClass, currentView }) => (
  <Container>
    <SubTitle>Admin dashboard</SubTitle>
    <CTAs>
      {currentView === AdminView.CLASSES && (
        <>
          <Button onClick={onAddClass} appearance='minimal'>
            Add new recurring class
          </Button>
        </>
      )}
    </CTAs>
  </Container>
);

export default Cockpit;
