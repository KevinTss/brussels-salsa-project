import { useState } from 'react';

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
  getMalesDancerIds,
  getFemalesDancerIds,
  getTotalDancers,
  getTotalWaitingList,
  getIsUserInDancers,
  getIsUserInWaitingList,
  getNewEvent,
  getDateAndDayAfter,
  hasUserClassLevelRequired,
} from '../../../../../utils';
import DetailsDrawer from './details-drawer';
import AddDancerDrawer from './add-dancer-drawer';
import {
  User,
  EventFetchOneParams,
  ClasseEvent,
  ClasseType,
  NewEventData,
} from '../../../../../types';

type Props = {
  classData: ClasseType;
  event: ClasseEvent;
  fetchEvents: () => void;
  fetchEvent: (data: EventFetchOneParams) => ClasseEvent | null;
  dayDate: any;
  addEvent: (data: NewEventData) => void;
  updateEvent: () => void;
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
  const isUserInDancers = getIsUserInDancers(event, currentUser);
  const isUserInWaitingList = getIsUserInWaitingList(event, currentUser);
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
      if (!newlyFetchedEvent) {
        const newEvent = getNewEvent(currentUser, classData, dayDate);
        await addEvent(newEvent);
        await fetchEvents();
      } else {
        /**
         * Refetch the event just before update it so we make sure data are
         * up to date at the moment of the action
         */
        const updatedEvent = newlyFetchedEvent;
        const totalDancers = getTotalDancers(updatedEvent);
        if (
          totalDancers < classData.spots.base &&
          totalDancers < (classData?.spots?.max || 999)
        ) {
          updatedEvent?.dancers?.[`${currentUser.gender}s`].push({
            joinOn: new Date(),
            userId: currentUser?.id || '',
          });
        } else if (
          totalDancers >= classData.spots.base &&
          classData?.spots?.max &&
          totalDancers < classData.spots.max
        ) {
          // We need to check the balance
          const sameGenderAmount =
            currentUser?.gender === 'male' ? males.length : females.length;
          const oppositeGenderAmount =
            currentUser?.gender === 'male' ? females.length : males.length;
          let listToAddTheNewDancer;
          if (sameGenderAmount > oppositeGenderAmount) {
            listToAddTheNewDancer = `waitingList`;
          } else {
            listToAddTheNewDancer = `dancers`;
          }
          updatedEvent[listToAddTheNewDancer][`${currentUser.gender}s`].push({
            joinOn: new Date(),
            userId: currentUser.id,
          });
        } else if (
          classData?.spots?.max &&
          totalDancers >= classData.spots.max
        ) {
          // Add the user to the waiting list
          updatedEvent.waitingList[`${currentUser.gender}s`].push({
            joinOn: new Date(),
            userId: currentUser.id,
          });
        }
        await updateEvent(updatedEvent.id, updatedEvent);
        await fetchEvents();
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.warn('error on join', error);
    }
  };

  const cancelHandle = async () => {
    if (
      !event?.id ||
      isAdminMode ||
      isEventPast ||
      (!isUserInDancers && !isUserInWaitingList)
    )
      return;

    const newlyFetchedEvent = await fetchEvent({ eventId: event.id });
    const isUserInDancersNewly = getIsUserInDancers(
      newlyFetchedEvent,
      currentUser
    );
    const isUserInWaitingListNewly = getIsUserInWaitingList(
      newlyFetchedEvent,
      currentUser
    );
    const currentUserGender = `${currentUser.gender}s`;
    const updatedEvent = newlyFetchedEvent;
    const list = isUserInWaitingListNewly ? 'waitingList' : 'dancers';
    const userIdIndex = updatedEvent[list][currentUserGender].findIndex(
      (userId) => userId === currentUser.id
    );
    updatedEvent[list][currentUserGender].splice(userIdIndex, 1);

    if (isUserInDancersNewly) {
      // Check in waiting list to replace dancer
      // Get waiting list from the same gender
      const sameGenderWaitingList = updatedEvent.waitingList[currentUserGender];
      if (sameGenderWaitingList.length) {
        // Remove the user where the date joinOn is the first
        const sortedList = sameGenderWaitingList.sort(
          (a, b) => a.joinOn.toDate() - b.joinOn.toDate()
        );
        const userToAddInDancers = sortedList.shift();
        updatedEvent.dancers[currentUserGender].push({
          userId: userToAddInDancers.useId,
          joinOn: new Date(),
        });
      }
    }
    delete updatedEvent.id;
    await updateEvent(event.id, updatedEvent);
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
      <DancersContainer $isHidden={!isAdminMode}>
        <h4>
          Dancers
          {!!waitingListLength && (
            <span>{waitingListLength} on waiting list</span>
          )}
        </h4>
        <MalesContainer>
          <p>Mens</p>
          <div>
            {getMalesDancerIds(event).map(({ userId }, i) => {
              const user = getById(userId);

              return (
                <Avatar
                  key={`m-${i}`}
                  firstName={user?.fullName?.split(' ')[0]}
                  lastName={user?.fullName?.split(' ')[1]}
                  image={undefined}
                />
              );
            })}
          </div>
        </MalesContainer>
        <FemalesContainer>
          <p>Girls</p>
          <div>
            {getFemalesDancerIds(event).map(({ userId }, i) => {
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
      </DancersContainer>
      <CallToActions>
        {!isAdminMode &&
          !isUserInDancers &&
          !isUserInWaitingList &&
          !isEventPast && (
            <Button
              appearance='primary'
              onClick={joinHandle}
              isLoading={isLoading}
              iconLeft={undefined}
              iconRight={undefined}
              isDisabled={undefined}
              isIconReverse={undefined}
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
              iconLeft={undefined}
              iconRight={undefined}
              isLoading={undefined}
              isIconReverse={undefined}
            >
              Past
            </Button>
          )}
        {!isAdminMode && (isUserInDancers || isUserInWaitingList) && (
          <Button
            appearance='minimal'
            onClick={cancelHandle}
            iconLeft={undefined}
            iconRight={undefined}
            isDisabled={undefined}
            isLoading={undefined}
            isIconReverse={undefined}
          >
            Cancel
          </Button>
        )}
        {isAdminMode && (
          <ButtonGroup isVertical>
            <Button
              appearance='default'
              onClick={() => setIsDetailsModalOpen(true)}
              iconLeft={undefined}
              iconRight={undefined}
              isDisabled={undefined}
              isLoading={undefined}
              isIconReverse={undefined}
            >
              See details
            </Button>
            <Button
              appearance='default'
              onClick={() => setIsAddDancerModalOpen(true)}
              iconLeft={undefined}
              iconRight={undefined}
              isDisabled={undefined}
              isLoading={undefined}
              isIconReverse={undefined}
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