import Router from 'next/router';

import {
  Container,
  GenderButton,
  GenderLabel,
  EmojiContainer,
  ButtonGroup,
  Description
} from './style';
import { useAuth } from '../../../hooks';
import { Title } from '../../../styles/GlobalStyle';
import { DancerRole as DancerRoleType } from '../../../types';

const DancerRole = () => {
  const { update } = useAuth();

  const onChoose = (role: DancerRoleType) => {
    update({
      dancerRole: role,
    }).then(() => {
      Router.push('/');
    });
  };

  return (
    <Container>
      <Title>Let us know your role</Title>
      <Description>
        As you may know, Salsa is a couple dance, in order to maintain the balance, we need to know your role. As a `Leader` you will drive the dance and as a `Follower` you will be leading by your partner (The leader is not specially a Gentleman and other way around).
      </Description>
      <ButtonGroup>
        <GenderButton onClick={() => onChoose('leader')}>
          <EmojiContainer>🕺</EmojiContainer>
          <GenderLabel>Leader</GenderLabel>
        </GenderButton>
        <GenderButton onClick={() => onChoose('follower')}>
          <EmojiContainer>💃</EmojiContainer>
          <GenderLabel>Follower</GenderLabel>
        </GenderButton>
      </ButtonGroup>
    </Container>
  );
};

export default DancerRole;
