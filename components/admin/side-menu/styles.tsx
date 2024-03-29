import { Container as ContainerCkakra, useTheme, Flex, Button } from '@chakra-ui/react';
import { forwardRef, ReactElement, FC, ForwardRefExoticComponent, RefAttributes } from 'react'

export const Container = ({ ...props }) => {
  const theme = useTheme()

  return (
    <ContainerCkakra
      width='230px'
      background={theme.colors.gray[800]}
      margin="0"
      padding="0"
      {...props}
    />
  );
}

export const MenuContainer = ({ ...props }) => {
  return (
    <Flex
      width="100%"
      flexDirection='column'
      padding="16px"
      gap="4px"
      {...props}
    />
  );
}
type Props = {
  isActive: boolean,
}
export const MenuItem = forwardRef<HTMLButtonElement, Props>(({ isActive, ...props }, ref) => {
  const theme = useTheme()

  return (
    <Button
      ref={ref}
      justifyContent='flex-start'
      variant='ghost'
      color={isActive ? theme.colors.gray[50] : theme.colors.gray[50]}
      background={isActive ? theme.colors.gray[700] : 'transparent'}
      _hover={{
        color: theme.colors.gray[50],
        background: theme.colors.gray[700]
      }}
      {...props}
    />
  );
})
