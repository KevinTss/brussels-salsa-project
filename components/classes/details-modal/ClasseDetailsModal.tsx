import { FC, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Avatar,
  AvatarGroup,
  Heading,
  Text,
  Flex
} from '@chakra-ui/react'

import { Classe, ClasseEvent, Dayjs } from '../../../types'
import {
  capitalize,
  getParticipantsIds
} from '../../../utils'
import ManageDancersModal from './manage-dancers-modal'
import { useAuth, useUsers } from '../../../hooks'

type Props = {
  event?: ClasseEvent,
  classe?: Classe,
  onClose: () => void
  date?: Dayjs
  refetchClasses: VoidFunction
  refetchEvents: VoidFunction
}

const ClasseDetailsModal: FC<Props> = ({ event, classe, onClose, date, refetchClasses, refetchEvents }) => {
  const { currentUser } = useAuth();
  const { list } = useUsers({ admin: currentUser })
  const [manageModal, setManageModal] = useState<'l' | 'f' | ''>('')
  const title = classe && `${capitalize(classe.type)} classe on ${classe.day} at ${classe.time}`
  const participantsIds = event ? getParticipantsIds(event) : null

  return (
    <>
      <Modal isOpen={!!classe} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>

          <ModalBody>
            <Flex>
              <Flex flexDirection="column" flex="1">
                <Heading size='sm'>Base spots</Heading>
                <Text>{classe?.spots.base}</Text>
              </Flex>
              <Flex flexDirection="column" flex="1">
                <Heading size='sm'>Max spots</Heading>
                <Text>{classe?.spots.max}</Text>
              </Flex>
            </Flex>
            <Flex mt="24px" justifyContent="space-between" borderBottom="1px solid rgba(0,0,0,0.1)">
              <Heading size='sm'>
                Leaders ({participantsIds?.leadersIds.length || 0})
                {participantsIds?.waitingLeadersIds.length ? ` – Waiting: ${participantsIds.waitingLeadersIds.length}` : ''}
              </Heading>
              <Button variant='ghost' onClick={() => setManageModal('l')} size='xs'>manage</Button>
            </Flex>
            <AvatarGroup size='sm' max={5} mt="6px">
              {participantsIds?.leadersIds.map(l => <Avatar key={l} name={l} />)}
            </AvatarGroup>
            <Flex mt="24px" justifyContent="space-between" borderBottom="1px solid rgba(0,0,0,0.1)">
              <Heading size='sm'>
                Followers ({participantsIds?.followersIds.length || 0})
                {participantsIds?.waitingFollowersIds.length ? ` – Waiting: ${participantsIds.waitingFollowersIds.length}` : ''}
              </Heading>
              <Button variant='ghost' onClick={() => setManageModal('f')} size='xs'>manage</Button>
            </Flex>
            <AvatarGroup size='sm' max={5} mt="6px">
              {participantsIds?.followersIds.map(f => <Avatar key={f} name={f} />)}
            </AvatarGroup>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {!!manageModal &&
        !!list?.length &&
        !!classe &&
        <ManageDancersModal
          state={manageModal}
          onClose={() => setManageModal('')}
          participantsIds={participantsIds}
          event={event}
          list={list}
          classe={classe}
        date={date}
        refetchClasses={refetchClasses}
        refetchEvents={refetchEvents}
        />
      }
    </>
  )
}

export default ClasseDetailsModal
