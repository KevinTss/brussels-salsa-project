import { Flex, Text } from '@chakra-ui/react';

export const Container = ({ ...props }) => (
  <Flex
    maxWidth='100%'
    width='100%'
    height="60px"
    alignItems='center'
    padding='0 16px'
    {...props}
  />
);

export const Left = ({ ...props }) => (
  <Flex
    width='40px'
    {...props}
  />
);

export const Right = ({ ...props }) => (
  <Flex
    flex="1"
    {...props}
  />
);

export const OrganisationName = ({ ...props }) => (
  <Text
    fontSize='12px'
    fontWeight='bold'
    marginLeft="8px"
    color="white"
    {...props}
  />
);
