import { useState } from 'react';
import { Dayjs } from 'dayjs';

import {
  EventContainer,
  DancersContainer,
  EventPrimariesInfo,
  CallToActions,
} from './style';
import { useAuth, useJoinEvent, useCancelJoinEvent } from '../../../../../hooks';
import { Button, Tag, ButtonGroup, triggerToast } from '../../../../ui';
import {
  djs,
  getEventNameDisplay,
  getIsUserInDancers,
  getIsUserInWaitingList,
  getTotalWaitingList,
} from '../../../../../utils';
import { ClasseEvent, Classe } from '../../../../../types';

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
  const { join } = useJoinEvent({
    classe: classData,
    event: event,
    dayDate
  })
  const { cancelJoin } = useCancelJoinEvent({
    classe: classData,
    event: event as ClasseEvent,
    dayDate
  })

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

  const joinHandle = async () => {
    if (isAdminMode) return

    try {
      await join(currentUser)
      await refetchEvents()
    } catch (e) {
      console.log('e', e)
      if (e === 'no-required-level') {
        triggerToast.error("You don't have the required level")
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
              appearance='primary'
            onClick={joinHandle}
            isDisabled={isEventPast}
            >
              Join
            </Button>
          )}
        {!isAdminMode && (isUserInDancers || isUserInWaitingList) && (
          <Button
            appearance='minimal'
            onClick={cancelHandle}
          >
            Cancel
          </Button>
        )}
      </CallToActions>
    </EventContainer>
  );
};

export default Event;
