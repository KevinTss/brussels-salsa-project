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
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

import { useUsers, useAuth, useEventUpdate } from '../../../../hooks'
import { ClasseEvent, User, Classe, Dayjs } from '../../../../types'
import { Input } from '../../../ui'
import UserLevelCard from '../../../users/level-card'
import {
  getUpdatedEventWithNewParticipants,
  getNewEventWithParticipants
} from '../../../../utils'

type ListType = 'participants' | 'waiting-list'
type Reason = 'in-opposite-list' | 'in-same-list'
type WarningInfoItem = {
  userId: string,
  reason: Reason
}
type WarningInfo = {
  type: ListType,
  items: WarningInfoItem[]
} | null
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
  } | null,
  event?: ClasseEvent,
  classe: Classe,
  list: User[]
  date?: Dayjs
  refetchClasses: VoidFunction
}

const onlyLeaders = (user: User) => user.dancerRole === 'leader'
const onlyFollowers = (user: User) => user.dancerRole === 'follower'
const usersToOptions = (users: User[]) => users.map(u => ({
  label: u.fullName,
  value: u.id
}))

const ManageDancersModal: FC<Props> = ({
  state,
  onClose,
  participantsIds,
  event,
  list,
  classe,
  date,
  refetchClasses
}) => {
  const { currentUser } = useAuth();
  const { update, isLoading } = useEventUpdate()

  const dancersIds = useMemo(
    () => state === 'l'
      ? participantsIds?.leadersIds || []
      : participantsIds?.followersIds || [],
    [state, participantsIds]
  )
  const waitingListIds = useMemo(
    () => state === 'l'
      ? participantsIds?.waitingLeadersIds || []
      : participantsIds?.waitingFollowersIds || [],
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
  const [warningInfo, setWarningInfo] = useState<WarningInfo>(null)

  return (
    <Modal isOpen={!!state} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage {state === 'l' ? 'leaders 🕺' : 'followers 💃'}</ModalHeader>

        <ModalBody>
          <Accordion>
            <AccordionItem>
              <AccordionButton onClick={() => {
                setSelectedWaitingIds([])
                setWarningInfo(null)
              }}>
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
              <AccordionButton onClick={() => {
                setSelectedParticipantIds([])
                setWarningInfo(null)
              }}>
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
          <Button variant='ghost' onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button variant='solid' onClick={onUpdateDancers} isLoading={isLoading}>Save</Button>
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
            onReset={() => setWarningInfo(null)}
          />
          <Button onClick={() => addParticipants(type)}>Add</Button>
        </Flex>
        {renderWarning(type)}
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

  function renderWarning(type: ListType) {
    if (!warningInfo || warningInfo.type !== type) return null

    return (
      <Alert
        status='warning'
        display="flex"
        alignItems="flex-start"
        mt={4}
      >
        <AlertIcon />
        <Box>
          <AlertTitle>Pay attention!</AlertTitle>
          <AlertDescription>
            Some users you want to add will provoke some side effects.
            <UnorderedList>
              {warningInfo.items.map((item) => {
                const user = usersList.find(({ id }) => id === item.userId)

                if (!user) return null

                return <ListItem key={user.id}>
                  {renderWarningMessage(user.fullName, item.reason, type)}
                </ListItem>
              })}
            </UnorderedList>
          </AlertDescription>
        </Box>
      </Alert>
    )

    function renderWarningMessage(userName: string, reasonKey: Reason, type: ListType) {
      const oppositeListName = type === 'participants' ? 'waiting list' : 'participants list'
      const sameListName = type === 'participants' ? 'participants list' : 'waiting list'
      if (reasonKey === 'in-opposite-list') {
        return <Text><Text as="span" fontWeight="bold">{userName}</Text> is inside the <Text as="span" fontWeight="bold">{oppositeListName}</Text> will be remove from it.</Text>
      } else {
        return <Text><Text as="span" fontWeight="bold">{userName}</Text> is already inside the <Text as="span" fontWeight="bold">{sameListName}</Text>, it will be ignored</Text>
      }
    }
  }

  function setParticipants(options: Options, type: ListType) {
    const newOptionsIds = options.map(n => n.value)
    if (type === 'participants') {
      setSelectedParticipantIds(newOptionsIds)
    } else {
      setSelectedWaitingIds(newOptionsIds)
    }
    // Check for warning
    const warningInfoItemsData: WarningInfoItem[] = []
    const oppositeList = type === 'participants' ? selectedWaiting : selectedParticipant
    newOptionsIds.forEach(userId => {
      const isUserInOppositeList = !!oppositeList.find(({ id }) => id === userId)
      if (isUserInOppositeList) {
        warningInfoItemsData.push({
          userId,
          reason: 'in-opposite-list'
        })
        return
      }
      const sameList = type === 'participants' ? selectedParticipant : selectedWaiting
      const isUserInSameList = !!sameList.find(({ id }) => id === userId)
      if (isUserInSameList) {
        warningInfoItemsData.push({
          userId,
          reason: 'in-same-list'
        })
        return
      }
    })
    if (warningInfoItemsData.length) {
      setWarningInfo({
        type,
        items: warningInfoItemsData
      })
    }
  }

  function addParticipants(type: ListType) {
    const newSelectedParticipants = [...type === 'participants' ? selectedParticipant : selectedWaiting]
    const ids = type === 'participants' ? selectedParticipantIds : selectedWaitingIds
    usersList
      .filter(({ id }) => ids.includes(id))
      .forEach(u => {
        const userIndex = newSelectedParticipants.findIndex(({ id }) => id === u.id)
        const oppositeList = type === 'participants' ? selectedWaiting : selectedParticipant
        const isUserInOppositeList = !!oppositeList.find(({ id }) => id === u.id)

        if (isUserInOppositeList) {
          const setSelection = type === 'participants' ? setSelectedWaiting : setSelectedParticipant
          // Rome user from waiting list
          setSelection((currentList) => {
            const newList = [...currentList]
            const userIndex = currentList.findIndex(user => user.id === u.id)
            newList.splice(userIndex, 1)
            return newList
          })
        }
        if (userIndex === -1) {
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
    setWarningInfo(null)
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
    if (!currentUser) return
    if (!event) {
      if (!date) return
      const newEvent = getNewEventWithParticipants({
        classe,
        newDancers: selectedParticipant,
        newWaitingUsers: selectedWaiting,
        role: state === 'l' ? 'leader' : 'follower',
        date,
      })
      console.log('create event', newEvent)
    } else {
      const updatedEvent = getUpdatedEventWithNewParticipants({
        event,
        newDancers: selectedParticipant,
        newWaitingUsers: selectedWaiting,
        role: state === 'l' ? 'leader' : 'follower'
      })
      // console.log('updatedEvent', event.id, updatedEvent)
      update({ id: event.id, data: updatedEvent, admin: currentUser })
      refetchClasses()
      onClose()
    }
  }
}

export default ManageDancersModal
