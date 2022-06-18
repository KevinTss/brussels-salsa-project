import { FC } from 'react'
import { Flex, Text, BoxProps } from '@chakra-ui/react'

import theme from '../../../../../../../styles/theme'

export const Container = ({ ...props }) =>
  <Flex
    flexDirection="column"
    width='100%'
    height='100%'
    alignItems="center"
    backgroundColor="white"
    paddingBottom="32px"
    {...props}
  />

export const DayText = ({ ...props }) =>
  <Text
    fontSize="12px"
    {...props}
  />

interface DayNumberProps extends BoxProps {
  isHighlight: boolean
}
export const DayNumber: FC<DayNumberProps> = ({ isHighlight, ...props }) =>
  <Text
    fontSize="28px"
    backgroundColor={isHighlight ? theme.colors.brand[700] : 'transparent'}
    borderRadius="50%"
    width="43px"
    height="43px"
    color={isHighlight ? 'white' : 'black'}
    textAlign='center'
    {...props}
  />
