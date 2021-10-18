import { Dialog } from '../../../../../ui';
import { Title, SubTitle, Text } from '../../../../../../styles/GlobalStyle';
import { getEventDisplayTitle } from '../../../../../../utils';

const DetailsDrawer = ({ isOpen, onClose, event, dayDate, classe }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      type={!!event ? 'large' : 'default'}
    >
      {!!event ? (
        <>
          <Title>{getEventDisplayTitle(classe, dayDate)}</Title>
          <SubTitle>Registered dancers</SubTitle>
          <SubTitle>Waiting list</SubTitle>
        </>
      ) : (
        <Text>They are no one in this session</Text>
      )}
    </Dialog>
  );
};

export default DetailsDrawer;
