import { Container as ContainerCkakra, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const Container = ({ ...props }) => (
  <Flex
    margin="0"
    padding="0"
    background='white'
    flex='1'
    maxWidth='100%'
    flexDirection='column'
    {...props}
  />
);

export const Content = ({ ...props }) => (
  <Flex
    margin="0"
    background='white'
    flex='1'
    maxWidth='100%'
    padding="16px"
    overflowY="auto"
    {...props}
  />
);
