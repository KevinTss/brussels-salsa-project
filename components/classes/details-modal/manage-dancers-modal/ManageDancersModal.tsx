import { FC, useState, useMemo, useCallback } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import { useUsers, useAuth, useEventUpdate } from '../../../../hooks'
import { ClasseEvent, User } from '../../../../types'
import { Input } from '../../../ui'
import UserLevelCard from '../../../users/level-card'

type ListType = 'participants' | 'waiting-list'
type Options = {
  label: string,
  value: string
}[]

type Props = {
  state: 'l' | 'f',
  onClose: () => void,
  participantsIds: {
    leadersIds: string[],
    followersIds: string[],
    waitingLeadersIds: string[],
    waitingFollowersIds: string[],
  },
  event: ClasseEvent
}

const onlyLeaders = (user: User) => user.dancerRole === 'leader'
const onlyFollowers = (user: User) => user.dancerRole === 'follower'
const usersToOptions = (users: User[]) => users.map(u => ({
  label: u.fullName,
  value: u.id
}))

const ManageDancersModal: FC<Props> = ({ state, onClose, participantsIds, event }) => {
  const { currentUser } = useAuth();
  const { list, isLoading } = useUsers({ admin: currentUser })
  const dancersIds = useMemo(
    () => state === 'l'
      ? participantsIds.leadersIds
      : participantsIds.followersIds,
    [state, participantsIds]
  )
  const waitingListIds = useMemo(
    () => state === 'l'
      ? participantsIds.waitingLeadersIds
      : participantsIds.waitingFollowersIds,
    [state, participantsIds]
  )
  const usersList = useMemo(
    () => list?.filter(state === 'l'
      ? onlyLeaders
      : onlyFollowers) || [],
    [list, state]
  )
  const participantsDefaultOptions = useMemo(() => usersList.filter(u => dancersIds.some(id => u.id === id)) || [], [usersList, dancersIds])
  const waitingDefaultOptions = useMemo(() => usersList.filter(u => waitingListIds.some(id => u.id === id)) || [], [usersList, waitingListIds])
  const [selectedParticipant, setSelectedParticipant] = useState<User[]>(participantsDefaultOptions)
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<string[]>([])
  const [selectedWaiting, setSelectedWaiting] = useState<User[]>(waitingDefaultOptions)
  const [selectedWaitingIds, setSelectedWaitingIds] = useState<string[]>([])

  return (
    <Modal isOpen={!!state} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage {state === 'l' ? 'leaders 🕺' : 'followers 💃'}</ModalHeader>

        <ModalBody>
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Participants ({selectedParticipant.length})
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} pt={4}>
                {renderSection('participants')}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Waiting list ({selectedWaiting.length})
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} pt={4}>
                {renderSection('waiting-list')}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>Cancel</Button>
          <Button variant='solid' onClick={onUpdateDancers}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  function renderSection(type: ListType) {
    const selection = type === 'participants' ? selectedParticipant : selectedWaiting
    const selectionIds = type === 'participants' ? selectedParticipantIds : selectedWaitingIds

    return (
      <>
        <Flex gap="12px">
          <Input
            id='participants'
            name="participants"
            type='select'
            onChange={(values) => setParticipants(values, type)}
            isMulti
            isSearchable
            options={usersToOptions(usersList)}
            closeMenuOnSelect={false}
            placeholder="Add participants…"
            value={selectionIds?.length ? selectionIds.map(pId => ({
              label: pId,
              value: pId
            })) : null}
            maxMenuHeight="150px"
          />
          <Button onClick={() => addParticipants(type)}>Add</Button>
        </Flex>
        <Flex direction='column' gap={4} mt={4} minHeight="150px">
          {selection.map(u => {
            return <Flex
              key={u.id}
              borderWidth='1px'
              borderRadius='lg'
              justifyContent="space-between"
              padding="4px 8px"
            >
              <Flex direction='column'>
                <Text mb={2}>{`${u.fullName} (${u.email})`}</Text>
                <UserLevelCard levels={u.levels} />
              </Flex>
              <Button onClick={() => removeParticipant(u, type)} variant='ghost' size='xs'>
                remove
              </Button>
            </Flex>
          })}
        </Flex>
      </>
    )
  }

  // TODO: handle alert to inform of ignore behaviours
  function renderWarning() {
    return (<Alert status='warning' display="flex" justifyContent="flex-start" alignContent="flex-start" alignItems="flex-start">
      <AlertIcon />
      <Box>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your application has been received. We will review your application
          and respond within the next 48 hours.
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>)
  }

  function setParticipants(options: Options, type: ListType) {
    if (type === 'participants') {
      setSelectedParticipantIds(options.map(n => n.value))
    } else {
      setSelectedWaitingIds(options.map(n => n.value))
    }
  }

  function addParticipants(type: ListType) {
    const newSelectedParticipants = [...type === 'participants' ? selectedParticipant : selectedWaiting]
    const ids = type === 'participants' ? selectedParticipantIds : selectedWaitingIds
    // TODO: handle case where participant is on other list
    usersList.filter(({ id }) => ids.includes(id)).forEach(u => {
      if (newSelectedParticipants.findIndex(p => p.id === u.id) === -1) {
        newSelectedParticipants.push(u)
      }
    })
    if (type === 'participants') {
      setSelectedParticipant(newSelectedParticipants)
      setSelectedParticipantIds([])
    } else {
      setSelectedWaiting(newSelectedParticipants)
      setSelectedWaitingIds([])
    }
  }

  function removeParticipant(user: User, type: ListType) {
    const participantsList = type === 'participants'
      ? selectedParticipant
      : selectedWaiting
    const userToRemoveIndex = participantsList.findIndex(({ id }) => id === user.id)

    if (userToRemoveIndex === -1) return

    participantsList.splice(userToRemoveIndex, 1)
    if (type === 'participants') {
      setSelectedParticipant([...participantsList])
    } else {
      setSelectedWaiting([...participantsList])
    }
  }

  function onUpdateDancers() {
    console.log('participants to sync', selectedParticipant)
    console.log('participants to sync', selectedParticipant)

    // const updatedEvent = getUpdatedEvent(event,)
    // update
  }
}

export default ManageDancersModal
