import { Dialog } from '../../../../../ui';
import { Title, SubTitle, Text } from '../../../../../../styles/GlobalStyle';
import { getEventDisplayTitle } from '../../../../../../utils';
import { useUsers } from '../../../../../../hooks';
import {
  TitleContainer,
  DancersContainer,
  MalesContainer,
  FemalesContainer,
  FullNameContainer,
} from './style';

const DetailsDrawer = ({ isOpen, onClose, event, dayDate, classe }) => {
  const { getById, list } = useUsers();

  const dancers = {
    males:
      (!!event &&
        event.dancers?.males.map((dancer) => getById(dancer.userId))) ||
      [],
    females:
      (!!event &&
        event.dancers?.females.map((dancer) => getById(dancer.userId))) ||
      [],
  };
  const waitingList = {
    males:
      (!!event &&
        event.waitingList?.males.map((dancer) => getById(dancer.userId))) ||
      [],
    females:
      (!!event &&
        event.waitingList?.females.map((dancer) => getById(dancer.userId))) ||
      [],
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      type={!!event ? 'large' : 'default'}
    >
      {!!event ? (
        <>
          <TitleContainer>
            <Title>{getEventDisplayTitle(classe, dayDate)}</Title>
          </TitleContainer>
          <SubTitle>Registered dancers</SubTitle>
          <DancersContainer>
            {!!dancers.males.length && (
              <MalesContainer as='ul'>
                <Text $isBold>Men</Text>
                {dancers.males.map((m, i) => (
                  <FullNameContainer key={`m-${i}`}>
                    <Text>{m?.fullName}</Text>
                  </FullNameContainer>
                ))}
              </MalesContainer>
            )}
            {!!dancers.females.length && (
              <FemalesContainer as='ul'>
                <Text $isBold>Women</Text>
                {dancers.females.map((f, i) => (
                  <FullNameContainer key={`f-${i}`}>
                    <Text>{f?.fullName}</Text>
                  </FullNameContainer>
                ))}
              </FemalesContainer>
            )}
          </DancersContainer>
          <SubTitle>Waiting list</SubTitle>
          <DancersContainer>
            {!!waitingList.males.length && (
              <MalesContainer as='ul'>
                <Text $isBold>Men</Text>
                {waitingList.males.map((m, i) => (
                  <FullNameContainer key={`m-${i}`}>
                    <Text>{m?.fullName}</Text>
                  </FullNameContainer>
                ))}
              </MalesContainer>
            )}
            {!!waitingList.females.length && (
              <FemalesContainer as='ul'>
                <Text $isBold>Women</Text>
                {waitingList.females.map((f, i) => (
                  <FullNameContainer key={`f-${i}`}>
                    <Text>{f?.fullName}</Text>
                  </FullNameContainer>
                ))}
              </FemalesContainer>
            )}
          </DancersContainer>
        </>
      ) : (
        <Text>They are no one in this session</Text>
      )}
    </Dialog>
  );
};

export default DetailsDrawer;
