import Router from 'next/router';

import {
  Container,
  GenderButton,
  GenderLabel,
  EmojiContainer,
  ButtonGroup,
} from './style';
import { useAuth } from '../../../hooks';
import { Title, TitleDescription } from '../../../styles/GlobalStyle';

const Gender = () => {
  const { update, currentUser } = useAuth();

  const onGenderChoose = (gender) => {
    update({
      ...currentUser,
      gender,
    }).then(() => {
      Router.push('/');
    });
  };

  return (
    <Container>
      <Title>Let us know your gender</Title>
      <TitleDescription>
        As you may know, Salsa is a couple dance, in order to maintain the
        balance, we need to know your gender.
      </TitleDescription>
      <ButtonGroup>
        <GenderButton onClick={() => onGenderChoose('male')}>
          <EmojiContainer>🕺</EmojiContainer>
          <GenderLabel>Man</GenderLabel>
        </GenderButton>
        <GenderButton onClick={() => onGenderChoose('female')}>
          <EmojiContainer>💃</EmojiContainer>
          <GenderLabel>Woman</GenderLabel>
        </GenderButton>
      </ButtonGroup>
    </Container>
  );
};

export default Gender;
