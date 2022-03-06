import Image from 'next/image';

import { LogoContainer } from './style';

// 💃🕺

export default function Logo() {
  return (
    <LogoContainer>
      <Image width='60px' height='60px' src='/img/logo.jpg' alt='logo' />
    </LogoContainer>
  );
}
