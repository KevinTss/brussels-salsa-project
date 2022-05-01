import Image from 'next/image';
import Link from 'next/link';

import { LogoContainer } from './style';

// 💃🕺

export default function Logo() {
  return (
    <LogoContainer>
      <Link href='/'>
        <a>
          <Image width='40px' height='40px' src='/img/logo.jpg' alt='logo' />
        </a>
      </Link>
    </LogoContainer>
  );
}
