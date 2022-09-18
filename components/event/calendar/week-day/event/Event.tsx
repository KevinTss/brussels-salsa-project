import { useState } from 'react';
import { Dayjs } from 'dayjs';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
  Text
} from '@chakra-ui/react'

import {
  EventContainer,
  DancersContainer,
  EventPrimariesInfo,
  CallToActions,
} from './style';
import {
  useAuth,
  useJoinEvent,
  useCancelJoinEvent,
  useLinkUsersGetByEmail,
  useUserFetchById
} from '../../../../../hooks';
import { Tag, triggerToast } from '../../../../ui';
import {
  djs,
  getEventNameDisplay,
  getIsUserInDancers,
  getIsUserInWaitingList,
  getTotalWaitingList,
} from '../../../../../utils';
import { ClasseEvent, Classe, LinkedUsers, User } from '../../../../../types';

type Props = {
  classData: Classe;
  event?: ClasseEvent;
  refetchEvents: () => void;
  dayDate: Dayjs;
  isAdminMode?: boolean;
};

const Event = ({
  classData,
  event,
  refetchEvents,
  dayDate,
  isAdminMode = false,
}: Props) => {
  const { currentUser } = useAuth();
  const [partner, setPartner] = useState<User | null>(null)
  const {
    data: linkedUser,
  } = useLinkUsersGetByEmail(currentUser)
  const { fetch: fetchUserById } = useUserFetchById()

  const { join, isLoading } = useJoinEvent({
    classe: classData,
    event: event,
    dayDate
  })
  const { cancelJoin } = useCancelJoinEvent({
    classe: classData,
    event: event as ClasseEvent,
    dayDate
  })
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  const eventDate = djs()
    .year(dayDate.year())
    .month(dayDate.month())
    .date(dayDate.date())
    .hour(Number(classData.time.split(':')[0]))
    .minute(Number(classData.time.split(':')[1]));
  const isEventPast = eventDate.isBefore(djs())
  const isUserInDancers = currentUser && event ? getIsUserInDancers(event, currentUser) : false
  const isUserInWaitingList = currentUser && event ? getIsUserInWaitingList(event, currentUser) : false;
  const waitingListLength = event ? getTotalWaitingList(event) : 0

  const onJoinClick = async () => {
    if (isAdminMode) return

    if (!linkedUser || linkedUser.status !== 'confirmed') {
      joinHandle()
    }

    if (!linkedUser) return // For TS

    const partnerRole: keyof LinkedUsers = currentUser?.dancerRole === 'leader' ? 'follower' : 'leader'
    setIsJoinModalOpen(true)
    const p = await fetchUserById(linkedUser[partnerRole])
    if (!p) {
      console.warn("Error during the partner retrieving")
    }
    setPartner(p)
  }

  const joinHandle = async (withPartner = false) => {
    try {
      await join(currentUser, withPartner ? partner ?? undefined : undefined)
      await refetchEvents()
      if (isJoinModalOpen) {
        setIsJoinModalOpen(false)
      }
    } catch (e) {
      console.log('e', e)
      if (e === 'no-required-level') {
        triggerToast.error("You don't have the required level")
      } else if (e === 'partner-already-in-classe') {
        triggerToast.error("Your partner is already in the class")
      } else if (e === 'no-required-level-partner') {
        triggerToast.error("Your partner doesn't have the required level")
      }
    }
  };

  const cancelHandle = async () => {
    if (isAdminMode || !currentUser) return

    try {
      await cancelJoin(currentUser)
      await refetchEvents()
    } catch (e) {
      console.log('e', e)
    }
  };

  return (
    <>
    <EventContainer>
      <EventPrimariesInfo>
        <h4>{getEventNameDisplay(classData.type, classData.level)}</h4>
        {isUserInDancers && <Tag>Joined</Tag>}
        {isUserInWaitingList && <Tag>On waiting list</Tag>}
        <div>{classData.time}</div>
      </EventPrimariesInfo>
      {isAdminMode && <DancersContainer>
        <h4>
          Dancers
          {!!waitingListLength && (
            <span>{waitingListLength} on waiting list</span>
          )}
        </h4>
      </DancersContainer>}
      <CallToActions>
        {!isAdminMode &&
          !isUserInDancers &&
          !isUserInWaitingList && (
            <Button
              variant='solid'
              colorScheme='red'
              onClick={onJoinClick}
            isDisabled={isEventPast}
            >
              Join
            </Button>
          )}
        {!isAdminMode && (isUserInDancers || isUserInWaitingList) && (
          <Button
              variant='solid'
              colorScheme='red'
            onClick={cancelHandle}
          >
            Cancel
          </Button>
        )}
      </CallToActions>
    </EventContainer>
      <Modal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do you want to join with {partner?.fullName}?</ModalHeader>

          <ModalBody>
            <Text>
              You have a partner, if you join the class together {partner?.fullName} will also be added to the list as well.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Flex flexDirection='column' w="100%" gap=".25rem">
              <Button
                variant='solid'
                colorScheme='red'
                onClick={() => joinHandle(true)}
                isLoading={isLoading}
              >
                Yes join together
              </Button>
              <Button
                variant='ghost'
                onClick={() => joinHandle()}
              >
                No join alone
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Event;
