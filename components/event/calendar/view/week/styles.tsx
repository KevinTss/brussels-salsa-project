import { Flex } from '@chakra-ui/react'

export const Container = ({ ...props }) =>
  <Flex
    height="100%"
    flex="1"
    flexDirection="column"
    {...props}
  />

export const Header = ({ ...props }) =>
  <Flex
    position="sticky"
    top="0"
    zIndex={2}
    {...props}
  />

export const Body = ({ ...props }) =>
  <Flex
    height="100%"
    flex="1"
    zIndex={1}
    {...props}
  />

export const DayColumn = ({ ...props }) =>
  <Flex
    flexDirection="column"
    flex="1"
    {...props}
  />
