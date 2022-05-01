import {
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  TableCaption as ChakraTableCaption,
  TableContainer as ChakraTableContainer,
  Flex,
} from '@chakra-ui/react'

export const UsersContainer = ({ ...props }) =>
  <Flex
    width="100%"
    flexDirection='column'
    {...props}
  />

export const Table = ({ ...props }) => <ChakraTable {...props} />

export const Thead = ({ ...props }) => <ChakraThead {...props} />

export const Tbody = ({ ...props }) => <ChakraTbody {...props} />

export const Tr = ({ ...props }) => <ChakraTr {...props} />

export const Th = ({ ...props }) => <ChakraTh {...props} />

export const Td = ({ ...props }) => <ChakraTd {...props} />

export const TableCaption = ({ ...props }) => <ChakraTableCaption {...props} />

export const TableContainer = ({ ...props }) => <ChakraTableContainer {...props} />
