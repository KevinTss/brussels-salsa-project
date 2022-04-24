import { Dayjs } from 'dayjs';
import cloneDeep from 'lodash.clonedeep';

import {
  User,
  Classe,
  NewClasseEvent,
  ClasseEvent,
  ClasseLevel,
  DancerRole,
} from '../../types';

export const getLeaderDancerIds = (event: ClasseEvent): string[] =>
  event?.dancers?.leaders?.map(({ userId }) => userId) || [];

export const getFollowerDancerIds = (event: ClasseEvent): string[] =>
  event?.dancers?.followers?.map(({ userId }) => userId) || [];

export const getTotalDancers = (event: ClasseEvent): number => {
  let total: number = 0;
  if (event.dancers.leaders?.length) {
    total += event.dancers.leaders?.length;
  }
  if (event.dancers.followers?.length) {
    total += event.dancers.followers?.length;
  }

  return total;
};

export const getTotalWaitingList = (event: ClasseEvent): number =>
  (event?.waitingList?.leaders?.length || 0) +
  (event?.waitingList?.followers?.length || 0);

export const isUserInDancers = (
  event: ClasseEvent,
  currentUser: User
): boolean =>
  currentUser.dancerRole === 'leader'
    ? !!event?.dancers?.leaders?.find(({ userId }) => userId === currentUser.id)
    : !!event?.dancers?.followers?.find(
        ({ userId }) => userId === currentUser.id
      );

export const isUserInWaitingList = (event: ClasseEvent, user: User): boolean =>
  user.dancerRole === 'leader'
    ? !!event.waitingList.leaders?.find(({ userId }) => userId === user.id)
    : !!event.waitingList.followers?.find(({ userId }) => userId === user.id);

export const getNewEvent = (
  user: User,
  classData: Classe,
  dayDate: Dayjs
): NewClasseEvent => ({
  classId: classData.id,
  dancers: {
    leaders:
      user.dancerRole === 'leader'
        ? [
            {
              joinOn: new Date().toISOString(),
              userId: user.id,
            },
          ]
        : [],
    followers:
      user.dancerRole === 'follower'
        ? [
            {
              joinOn: new Date().toISOString(),
              userId: user.id,
            },
          ]
        : [],
  },
  waitingList: {
    leaders: [],
    followers: [],
  },
  date: dayDate.hour(0).minute(0).second(0).toDate(),
});

export const getDisplayClasseLevel = (level: ClasseLevel): string =>
  ['Beginner', 'Improver'][level];

const getMajority = (
  leadersAmount: number,
  followersAmount: number
): DancerRole | null => {
  const differenceDancers = leadersAmount - followersAmount;

  if (differenceDancers > 0) return 'leader';

  if (differenceDancers < 0) return 'follower';

  return null;
};

const addDancerFromWaitingList = (
  eventToUpdate: ClasseEvent,
  role: DancerRole = 'leader'
): { event: ClasseEvent; addedDancerId: string | null } => {
  const updatedEvent = cloneDeep(eventToUpdate);
  let addedDancerId: string | null = null;
  if (role === 'leader') {
    const [leader] = updatedEvent.waitingList.leaders.splice(0, 1);
    if (leader) {
      updatedEvent.dancers.leaders.push(leader);
      addedDancerId = leader.userId;
    }
  } else {
    const [follower] = updatedEvent.waitingList.followers.splice(0, 1);
    if (follower) {
      updatedEvent.dancers.followers.push(follower);
      addedDancerId = follower.userId;
    }
  }

  return { event: updatedEvent, addedDancerId };
};

const shouldCheckBalance = (
  leadersAmount: number,
  followersAmount: number,
  classe: Classe
): boolean => leadersAmount + followersAmount >= classe.spots.base;

const moveDancerFromWaitingList = (
  event: ClasseEvent
): { event: ClasseEvent; movedDancerId: string | null } => {
  const {
    waitingList: { leaders: waitingLeaders, followers: waitingFollowers },
  } = event;
  if (waitingLeaders.length) {
    const { event: updatedEvent, addedDancerId: newAddedDancerId } =
      addDancerFromWaitingList(event);

    return {
      event: updatedEvent,
      movedDancerId: newAddedDancerId,
    };
  }
  if (waitingFollowers.length) {
    const { event: updatedEvent, addedDancerId: newAddedDancerId } =
      addDancerFromWaitingList(event, 'follower');
    if (newAddedDancerId) {
      return {
        event: updatedEvent,
        movedDancerId: newAddedDancerId,
      };
    }

    return {
      event: updatedEvent,
      movedDancerId: null,
    };
  }
  return {
    event: cloneDeep(event),
    movedDancerId: null,
  };
};

const isLimitOffsetReached = (
  leadersAmount: number,
  followersAmount: number,
  classe: Classe
): boolean => {
  const differenceDancersAbs = Math.abs(leadersAmount - followersAmount);

  return differenceDancersAbs >= classe.balanceOffset;
};

export const handleWaitingList = (
  event: ClasseEvent,
  classe: Classe
): {
  addedDancerIds: string[];
  updatedEvent: ClasseEvent;
} => {
  let clonedEvent = cloneDeep(event);

  let addedDancerIds: string[] = [];
  let shouldLoop = true;
  let counter = 0;

  while (shouldLoop) {
    counter++;
    console.log('event:', counter);

    if (counter > 100) {
      shouldLoop = false;
      console.warn('Loop interrupted by safety loop guard');
      break;
    }

    const {
      waitingList: { leaders: waitingLeaders, followers: waitingFollowers },
    } = clonedEvent;

    if (!waitingLeaders.length && !waitingFollowers.length) {
      shouldLoop = false;
      // console.warn('Loop interrupted due to empty waiting list');
      break;
    }

    const {
      dancers: { leaders, followers },
    } = clonedEvent;

    const totalDancers = leaders.length + followers.length;
    const spotLimit = classe.spots.max;

    if (spotLimit && totalDancers >= spotLimit) {
      shouldLoop = false;
      // console.warn('Loop interrupted due to max spot reached');
      break;
    }

    const majority = getMajority(leaders.length, followers.length);

    if (
      !majority ||
      !shouldCheckBalance(leaders.length, followers.length, classe) ||
      !isLimitOffsetReached(leaders.length, followers.length, classe)
    ) {
      const { event, movedDancerId } = moveDancerFromWaitingList(clonedEvent);

      if (movedDancerId) addedDancerIds.push(movedDancerId);

      clonedEvent = event;
      continue;
    }

    console.log('majority', majority);
    console.log(
      'shouldCheckBalance',
      shouldCheckBalance(leaders.length, followers.length, classe)
    );
    console.log(
      'isLimitOffsetReached',
      isLimitOffsetReached(leaders.length, followers.length, classe)
    );

    console.log('break at loop', counter);
    console.log('total leaders', clonedEvent.dancers.leaders.length);
    console.log('total followers', clonedEvent.dancers.followers.length);
    console.log('class balance offset', classe.balanceOffset);
    break;
  } // End of while

  // console.log('LAST COUNTER', counter)
  return {
    addedDancerIds,
    updatedEvent: clonedEvent,
    counter,
  };
};
