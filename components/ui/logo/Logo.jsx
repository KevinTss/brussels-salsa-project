import Image from 'next/image';
import Link from 'next/link';

import { LogoContainer } from './style';

// 💃🕺

export default function Logo() {
  return (
    <LogoContainer>
      <Link href='/'>
        <a>
          <Image width='60px' height='60px' src='/img/logo.jpg' alt='logo' />
        </a>
      </Link>
    </LogoContainer>
  );
}
