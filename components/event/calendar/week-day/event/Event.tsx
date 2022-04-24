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
  djs,
  getEventNameDisplay,
  getLeaderDancerIds,
  getFollowerDancerIds,
  getTotalDancers,
  getTotalWaitingList,
  isUserInDancers as isUserInDancersFunc,
  isUserInWaitingList as isUserInWaitingListFunc,
  getNewEvent,
  getDateAndDayAfter,
  hasUserClassLevelRequired,
} from '../../../../../utils';
import DetailsDrawer from './details-drawer';
import AddDancerDrawer from './add-dancer-drawer';
import {
  User,
  ClasseEventFetchOneParams,
  ClasseEvent,
  Classe,
  UpdateClasseEvent,
  NewClasseEvent,
} from '../../../../../types';
import { addUserToDancers, addUserToEvent, addUserToWaitingList, handleWaitingList, removeUserFromEvent } from './utils'

type Props = {
  classData: Classe;
  event: ClasseEvent;
  fetchEvents: () => ClasseEvent[];
  fetchEvent: (data: ClasseEventFetchOneParams) => ClasseEvent | null;
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
  const isEventPast = eventDate.isBefore(djs());
  const isUserInDancers = isUserInDancersFunc(event, currentUser as User);
  const isUserInWaitingList = isUserInWaitingListFunc(event, currentUser as User);
  const waitingListLength = getTotalWaitingList(event);

  const joinHandle = async () => {
    if (
      isAdminMode ||
      isEventPast ||
      isUserInDancers ||
      isUserInWaitingList ||
      !currentUser
    )
      return;

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

    if (hasUserClassLevelRequired(currentUser, classData)) {
      triggerToast.error(
        "Sorry, you don't have yet the level to join this class"
      );
      setIsLoading(false);

      return;
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
      /**
       * Refetch the event just before update it so we make sure data are
       * up to date at the moment of the action
       */
      let updatedEvent: ClasseEvent = newlyFetchedEvent;
      const totalDancers = getTotalDancers(updatedEvent);

      if (
        totalDancers < classData.spots.base &&
        totalDancers < (classData?.spots?.max || 999)
      ) {
        updatedEvent = addUserToDancers(updatedEvent, currentUser)
        // updatedEvent?.dancers?.[currentUser?.dancerRole === 'leader' ? 'leaders' : 'followers']?.push({
        //   joinOn: new Date(),
        //   userId: currentUser?.id || '',
        // });
      } else if (
        totalDancers >= classData.spots.base &&
        classData?.spots?.max &&
        totalDancers < classData.spots.max
      ) {
        // We need to check the balance
        // const sameRoleAmount = currentUser.dancerRole === 'leader'
        //   ? updatedEvent.dancers.leaders?.length || 0
        //   : updatedEvent.dancers.followers?.length || 0;
        // const oppositeRoleAmount = currentUser.dancerRole === 'leader'
        //   ? updatedEvent.dancers.followers?.length || 0
        //   : updatedEvent.dancers.leaders?.length || 0;
        // let listToAddTheNewDancer: 'waitingList' | 'dancers';
        // if (sameRoleAmount > oppositeRoleAmount) {
        //   listToAddTheNewDancer = `waitingList`;
        // } else {
        //   listToAddTheNewDancer = `dancers`;
        // }
        // updatedEvent[listToAddTheNewDancer][currentUser?.dancerRole === 'leader' ? 'leaders' : 'followers']?.push({
        //   joinOn: new Date(),
        //   userId: currentUser.id,
        // });
        updatedEvent = addUserToEvent(updatedEvent, currentUser)
      } else if (
        classData?.spots?.max &&
        totalDancers >= classData.spots.max
      ) {
        // Add the user to the waiting list
        // updatedEvent?.waitingList?.[currentUser?.dancerRole === 'leader' ? 'leaders' : 'followers']?.push({
        //   joinOn: new Date(),
        //   userId: currentUser.id,
        // });
        updatedEvent = addUserToWaitingList(updatedEvent, currentUser)
      }
      updatedEvent = handleWaitingList(updatedEvent, classData)
      await updateEvent(updatedEvent.id, updatedEvent);
      await fetchEvents();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.warn('error on join', error);
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

    const newlyFetchedEvent = await fetchEvent({ eventId: event.id });
    const updatedEvent = removeUserFromEvent(newlyFetchedEvent as ClasseEvent, currentUser)
    const isUserInDancersNewly = isUserInDancersFunc(
      newlyFetchedEvent as ClasseEvent,
      currentUser as User
    );
    // const isUserInWaitingListNewly = isUserInWaitingListFunc(
    //   newlyFetchedEvent as ClasseEvent,
    //   currentUser as User
    // );
    // const currentUserRoleKey = currentUser?.dancerRole === 'leader' ? 'leaders' : 'followers';
    // const updatedEvent = newlyFetchedEvent;
    // const listKey = isUserInWaitingListNewly ? 'waitingList' : 'dancers';
    // const userIdIndex = updatedEvent?.[listKey]?.[currentUserRoleKey]?.findIndex(
    //   ({ userId }) => userId === currentUser?.id
    // );
    // updatedEvent?.[listKey]?.[currentUserRoleKey]?.splice(userIdIndex as number, 1);

    if (isUserInDancersNewly) {
      // Check in waiting list to replace dancer
      // Get waiting list from the same gender
      const sameRoleWaitingList = updatedEvent?.waitingList?.[currentUserRoleKey];
      if (sameRoleWaitingList?.length) {
        // Remove the user where the date joinOn is the first
        const sortedList = sameRoleWaitingList?.sort(
          (a, b) => a.joinOn.getTime() - b.joinOn.getTime()
        );
        const userToAddInDancers = sortedList.shift();
        updatedEvent?.dancers?.[currentUserRoleKey]?.push({
          userId: userToAddInDancers?.userId as string,
          joinOn: new Date(),
        });
      }
    }
    if (updatedEvent?.id) {
      // @ts-ignore: See: https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato
      delete updatedEvent.id;
    }
    await updateEvent(event.id, updatedEvent as UpdateClasseEvent);
    await fetchEvents();
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
          !isUserInWaitingList &&
          !isEventPast && (
            <Button
              appearance='primary'
              onClick={joinHandle}
            isLoading={isLoading}
            >
              Join
            </Button>
          )}
        {!isAdminMode &&
          !isUserInDancers &&
          !isUserInWaitingList &&
          isEventPast && (
            <Button
              appearance='minimal'
            isDisabled
            >
              Past
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
          <AddDancerDrawer
            isOpen={isAddDancerModalOpen}
            onClose={() => setIsAddDancerModalOpen(false)}
            event={event}
            classe={classData}
            dayDate={dayDate}
            refetchEvents={fetchEvents}
          />
        </>
      )}
    </EventContainer>
  );
};

export default Event;
