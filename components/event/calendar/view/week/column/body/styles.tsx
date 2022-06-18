import { FC } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

import { CALENDAR_CELL_HEIGHT } from '../../../../../../../constants'

export const Container = ({ ...props }) =>
  <Flex
    position='relative'
    width='100%'
    height='100%'
    {...props}
  />

export const AbsoluteContainer = ({ ...props }) =>
  <Flex
    position="absolute"
    width='100%'
    height='100%'
    top="0"
    left="0"
    flexDirection="column"
    {...props}
  />

interface HourCallProps extends BoxProps {
  hour?: number
}
export const HourCell: FC<HourCallProps> = ({ hour, ...props }) =>
  <Box
    flex="1"
    position="relative"
    borderTop='1px solid grey'
    width='100%'
    height={`${CALENDAR_CELL_HEIGHT}px`}
    minHeight={`${CALENDAR_CELL_HEIGHT}px`}
    maxHeight={`${CALENDAR_CELL_HEIGHT}px`}
    {...props}
  >
    {hour && (
      <Box
        position="absolute"
        top="-6px"
        right="calc(100% + 5px)"
        fontSize="8px"
        color='#656686'
      >
        {`${hour}:00`}
      </Box>
    )}
  </Box>
