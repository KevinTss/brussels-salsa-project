import { useState } from 'react';
import { Dayjs } from 'dayjs';

import {
  EventContainer,
  DancersContainer,
  MalesContainer,
  FemalesContainer,
  EventPrimariesInfo,
  CallToActions,
} from './style';
import { useAuth, useJoinEvent, useCancelJoinEvent } from '../../../../../hooks';
import { Button, Avatar, Tag, ButtonGroup } from '../../../../ui';
import {
  djs,
  getEventNameDisplay,
  getFollowerDancerIds,
  getIsUserInDancers,
  getIsUserInWaitingList,
  getLeaderDancerIds,
  getTotalWaitingList,
} from '../../../../../utils';
import DetailsDrawer from './details-drawer';
import AddDancerDrawer from './add-dancer-drawer';
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
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddDancerModalOpen, setIsAddDancerModalOpen] = useState(false);
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
        {/* <MalesContainer>
          <p>Leaders</p>
          <div>
            {getLeaderDancerIds(event).map((userId, i) => {
              const user = getById(userId);

              return (
                <Avatar
                  key={`l-${i}`}
                  firstName={user?.fullName?.split(' ')[0]}
                  lastName={user?.fullName?.split(' ')[1]}
                  image={undefined}
                />
              );
            })}
          </div>
        </MalesContainer> */}
        {/* <FemalesContainer>
          <p>Followers</p>
          <div>
            {getFollowerDancerIds(event).map((userId, i) => {
              const user = getById(userId);

              return (
                <Avatar
                  key={`f-${i}`}
                  firstName={user?.fullName?.split(' ')[0]}
                  lastName={user?.fullName?.split(' ')[1]}
                  image={undefined}
                />
              );
            })}
          </div>
        </FemalesContainer> */}
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
        {isAdminMode && (
          <ButtonGroup isVertical>
            <Button
              appearance='default'
              onClick={() => setIsDetailsModalOpen(true)}
            >
              See details
            </Button>
            <Button
              appearance='default'
              onClick={() => setIsAddDancerModalOpen(true)}
            >
              Add dancer
            </Button>
          </ButtonGroup>
        )}
      </CallToActions>
      {isAdminMode && (
        <>
          <DetailsDrawer
            dayDate={dayDate}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            event={event}
            classe={classData}
          />
          {event && <AddDancerDrawer
            isOpen={isAddDancerModalOpen}
            onClose={() => setIsAddDancerModalOpen(false)}
            event={event}
            classe={classData}
            dayDate={dayDate}
            refetchEvents={refetchEvents}
          />}
        </>
      )}
    </EventContainer>
  );
};

export default Event;
