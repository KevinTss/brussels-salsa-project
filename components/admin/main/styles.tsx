import { Container as ContainerCkakra } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};
export const Container = ({ children, ...props }: ContainerProps) => (
  <ContainerCkakra
    margin="0"
    padding="0"
    background='white'
    flex='1'
    maxWidth='100%'
    {...props}
  >
    {children}
  </ContainerCkakra>
);
