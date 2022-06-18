import { Flex, useTheme } from '@chakra-ui/react';

export const Container = ({ ...props }) => {
  const theme = useTheme()

  return (
    <Flex
      background={theme.colors.gray[100]}
      maxWidth='100%'
      width='100%'
      height="60px"
      alignItems='center'
      padding='0 16px'
      zIndex={1}
      {...props}
    />
  );
}

export const Left = ({ ...props }) => (
  <Flex
    flex="1"
    {...props}
  />
);

export const Right = ({ ...props }) => (
  <Flex
    {...props}
  />
);
