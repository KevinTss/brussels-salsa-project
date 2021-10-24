import Router from 'next/router';

import { Container, CTAs } from './style';
import { Button } from '../../ui';
import { SubTitle } from '../../../styles/GlobalStyle';

const Cockpit = ({ onAddClass }) => (
  <Container>
    <SubTitle>Admin dashboard</SubTitle>
    <CTAs>
      <Button onClick={() => Router.push('/')} appearance='minimal'>
        Back to home
      </Button>
      <Button onClick={onAddClass} appearance='minimal'>
        Add new recurring class
      </Button>
    </CTAs>
  </Container>
);

export default Cockpit;
