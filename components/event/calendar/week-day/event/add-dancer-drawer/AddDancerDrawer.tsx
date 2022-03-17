import { Dialog, Button } from '../../../../../ui';
import { SubTitle, Text } from '../../../../../../styles/GlobalStyle';
import { getLevelDisplay } from '../../../../../../utils';
import { useUsers } from '../../../../../../hooks';
import { DancersContainer, FullNameContainer } from './style';
import { EventType, ClasseType } from '../../../../../../types';

type AddDancerDrawer = {
  isOpen: boolean;
  onClose: () => void;
  event: EventType;
  classe: ClasseType;
};

const AddDancerDrawer = ({
  isOpen,
  onClose,
  event,
  classe,
}: AddDancerDrawer) => {
  const { list } = useUsers();

  const eventUserList = {
    dancers: {
      males: event?.dancers?.males?.map((dancer) => dancer.userId) || [],
      females: event?.dancers?.females?.map((dancer) => dancer.userId) || [],
    },
    waitingList: {
      males: event?.waitingList?.males?.map((dancer) => dancer.userId) || [],
      females:
        event?.waitingList?.females?.map((dancer) => dancer.userId) || [],
    },
  };

  const userList = list.filter(
    (user) =>
      !eventUserList.dancers.males.includes(user?.id || '') &&
      !eventUserList.dancers.females.includes(user?.id || '')
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} type='large'>
      <SubTitle>{`Add a dancer to ${classe.type} ${getLevelDisplay(
        classe.level
      )} on ${classe.day}`}</SubTitle>
      <DancersContainer>
        {userList.map((m, i) => (
          <FullNameContainer key={`m-${i}`}>
            <Text>{m?.id}</Text>
            <Button
              iconLeft={undefined}
              appearance={undefined}
              iconRight={undefined}
              isDisabled={undefined}
              isLoading={undefined}
              isIconReverse={undefined}
            >
              {'Add'}
            </Button>
          </FullNameContainer>
        ))}
      </DancersContainer>
    </Dialog>
  );
};

export default AddDancerDrawer;
