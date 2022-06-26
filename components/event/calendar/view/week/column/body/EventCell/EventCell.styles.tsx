import { Flex, Text as TextChakra } from '@chakra-ui/react'

import { CALENDAR_CELL_HEIGHT } from '../../../../../../../../constants'
import theme from '../../../../../../../../styles/theme'

export const Container = ({ offset = 0, ...props }) =>
  <Flex
    position='absolute'
    width='100%'
    height={`${CALENDAR_CELL_HEIGHT}px`}
    backgroundColor='white'
    left="0"
    top={`${CALENDAR_CELL_HEIGHT * offset}px`}
    borderRadius="5px"
    boxShadow="0 15px 45px 0 rgb(0, 0, 0, 0.1)"
    background={theme.colors.brand[700]}
    padding='3px 5px'
    cursor="pointer"
    flexDirection="column"
    {...props}
  />

export const Text = ({ ...props }) =>
  <TextChakra
    color="white"
    fontSize="10px"
    lineHeight="12px"
    fontWeight="bold"
    margin="0"
    {...props}
  />
