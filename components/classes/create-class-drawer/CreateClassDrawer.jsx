import { Dialog } from '../../ui';
import CreateClassForm from '../create-class-form';

const CreateClassDrawer = ({ isOpen, onClose }) => (
  <Dialog isOpen={isOpen} onClose={onClose} type='aside'>
    <CreateClassForm />
  </Dialog>
);

export default CreateClassDrawer;
