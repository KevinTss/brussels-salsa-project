import { Flex } from '@chakra-ui/react'

export const Row = ({ ...props }) => <Flex
  justifyContent="space-between"
  gap="4px"
  {...props}
/>
