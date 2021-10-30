import { Dialog } from '../../ui';
import CreateClassForm from '../create-class-form';
import { Title, Text } from '../../../styles/GlobalStyle';
import { Header } from './style';

const CreateClassDrawer = ({ isOpen, onClose }) => (
  <Dialog isOpen={isOpen} onClose={onClose} type='aside'>
    <Header>
      <Title>Create a new recurring class</Title>
      <Text>
        {`A class is a recurring event which will appear on the calendar view. This will allow dancers to join `}
        <b>event</b>
        {`. An event doesn't exist since at least one dancer join.`}
      </Text>
    </Header>
    <CreateClassForm onClose={onClose} />
  </Dialog>
);

export default CreateClassDrawer;
