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
import { useUsers, useAuth } from '../../../../../hooks';
import { Button, Avatar, Tag, triggerToast, ButtonGroup } from '../../../../ui';
import {
  addUserToDancers,
  addUserToWaitingList,
  djs,
  getDateAndDayAfter,
  getEventNameDisplay,
  getFollowerDancerIds,
  getIsUserInDancers,
  getIsUserInWaitingList,
  getLeaderDancerIds,
  getNewEvent,
  getTotalWaitingList,
  handleWaitingList,
  hasUserClassLevelRequired,
  isEventFull,
  isLimitOffsetReached_v2,
  isOppositeRoleInMajority,
  removeUserFromEvent,
  shouldCheckBalance_v2,
} from '../../../../../utils';
import DetailsDrawer from './details-drawer';
import AddDancerDrawer from './add-dancer-drawer';
import {
  ClasseEventFetchOneParams,
  ClasseEvent,
  Classe,
  UpdateClasseEvent,
  NewClasseEvent, ClasseEventWithOptionalId
} from '../../../../../types';

type Props = {
  classData: Classe;
  event?: ClasseEvent;
  fetchEvents: () => Promise<ClasseEvent[]>;
  fetchEvent: (data: ClasseEventFetchOneParams) => Promise<ClasseEvent | null>;
  dayDate: Dayjs;
  addEvent: (data: NewClasseEvent) => void;
  updateEvent: (id: string, data: UpdateClasseEvent) => void;
  isAdminMode: boolean;
};

const Event = ({
  classData,
  event,
  fetchEvents,
  fetchEvent,
  dayDate,
  addEvent,
  updateEvent,
  isAdminMode,
}: Props) => {
  const { getById } = useUsers();
  const { currentUser } = useAuth();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddDancerModalOpen, setIsAddDancerModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (
      isAdminMode ||
      isEventPast ||
      isUserInDancers ||
      isUserInWaitingList ||
      !currentUser?.dancerRole
    ) {
      console.group()
      console.log('isAdminMode', isAdminMode)
      console.log('isEventPast', isEventPast)
      console.log('isUserInDancers', isUserInDancers)
      console.log('isUserInWaitingList', isUserInWaitingList)
      console.log('currentUser', currentUser)
      console.groupEnd()

      return
    }


    if (!hasUserClassLevelRequired(currentUser, classData)) {
      triggerToast.error(
        "Sorry, you don't have yet the level to join this class"
      );

      return;
    }

    setIsLoading(true);

    let newlyFetchedEvent;
    if (event?.id) {
      newlyFetchedEvent = await fetchEvent({ eventId: event.id });
    } else {
      const [dateFrom, dateTo] = getDateAndDayAfter(dayDate);
      newlyFetchedEvent = await fetchEvent({
        classId: classData.id,
        dateFrom,
        dateTo,
      });
    }

    try {
      // In case the user is the first to join, no event exist in DB
      if (!newlyFetchedEvent) {
        const newEvent = getNewEvent(currentUser, classData, dayDate);
        await addEvent(newEvent);
        await fetchEvents();
        setIsLoading(false);

        return
      }

      let updatedEvent: ClasseEventWithOptionalId
      let whereTheUserWhereAdded: 'waitingList' | 'dancers'
      /**
       * The order of checks is IMPORTANT
       */
      if (isEventFull(newlyFetchedEvent, classData)) {
        updatedEvent = addUserToWaitingList(newlyFetchedEvent, currentUser)
        whereTheUserWhereAdded = 'waitingList'
      } else if (!shouldCheckBalance_v2(newlyFetchedEvent, classData)) {
        updatedEvent = addUserToDancers(newlyFetchedEvent, currentUser)
        whereTheUserWhereAdded = 'dancers'
      } else if (isOppositeRoleInMajority(newlyFetchedEvent, currentUser)) {
        updatedEvent = addUserToDancers(newlyFetchedEvent, currentUser)
        whereTheUserWhereAdded = 'dancers'
      } else if (isLimitOffsetReached_v2(newlyFetchedEvent, classData)) {
        updatedEvent = addUserToWaitingList(newlyFetchedEvent, currentUser)
        whereTheUserWhereAdded = 'waitingList'
      } else {
        updatedEvent = addUserToDancers(newlyFetchedEvent, currentUser)
        whereTheUserWhereAdded = 'dancers'
      }

      const { updatedEvent: finalUpdatedEvent, addedDancerIds } = handleWaitingList(updatedEvent, classData)

      const eventId = finalUpdatedEvent.id
      // TODO: send email to added users
      console.log('addedDancerIds', addedDancerIds)
      delete updatedEvent.id

      await updateEvent(eventId as string, updatedEvent);
      await fetchEvents()

      if (whereTheUserWhereAdded === 'waitingList') {
        triggerToast.success("The classe is full, you have been successfully added in the waiting list");
      } else {
        triggerToast.success("You've been successfully added");
      }

      setIsLoading(false);

    } catch (error: any) {
      setIsLoading(false);
      console.warn('error on join', error);
      console.warn('message', error.message);
    }
  };

  const cancelHandle = async () => {
    if (!currentUser) return
    if (
      !event?.id ||
      isAdminMode ||
      isEventPast ||
      (!isUserInDancers && !isUserInWaitingList)
    )
      return;

    setIsLoading(true)

    const newlyFetchedEvent = await fetchEvent({ eventId: event.id });

    if (!newlyFetchedEvent) {
      triggerToast.error("Sorry, something went wrong");
      setIsLoading(false)

      return
    }

    const updatedEvent = removeUserFromEvent(newlyFetchedEvent, currentUser)
    const { updatedEvent: finalUpdatedEvent, addedDancerIds } = handleWaitingList(updatedEvent, classData)

    const eventId = finalUpdatedEvent.id
    // TODO: send email to added users
    console.log('addedDancerIds', addedDancerIds)
    delete finalUpdatedEvent.id

    await updateEvent(eventId as string, finalUpdatedEvent);
    await fetchEvents()

    setIsLoading(false)
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
        <MalesContainer>
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
        </MalesContainer>
        <FemalesContainer>
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
        </FemalesContainer>
      </DancersContainer>}
      <CallToActions>
        {!isAdminMode &&
          !isUserInDancers &&
          !isUserInWaitingList && (
            <Button
              appearance='primary'
              onClick={joinHandle}
            isLoading={isLoading}
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
            refetchEvents={fetchEvents}
          />}
        </>
      )}
    </EventContainer>
  );
};

export default Event;
