import cloneDeep from 'lodash.clonedeep';

import {
  User,
  Classe,
  NewClasseEvent,
  ClasseEvent,
  ClasseLevel,
  DancerRole,
  ClasseEventWithOptionalId,
  Dayjs,
} from '../types';
import { djs } from './date.utils';

export const addUserToWaitingList = (
  event: ClasseEvent,
  user: User,
  partner?: User
): ClasseEvent => {
  if (!user.dancerRole) {
    throw new Error('dancerRole is missing in user object');
  }

  const updatedEvent = cloneDeep(event);
  updatedEvent.waitingList[
    user.dancerRole === 'leader' ? 'leaders' : 'followers'
  ].push({
    joinOn: new Date(),
    userId: user.id,
  });

  if (partner) {
    updatedEvent.waitingList[
      partner.dancerRole === 'leader' ? 'leaders' : 'followers'
    ].push({
      joinOn: new Date(),
      userId: partner.id,
      by: 'partner',
    });
  }

  return updatedEvent;
};

export const addUserToDancers = (
  event: ClasseEvent,
  user: User,
  partner?: User
): ClasseEvent => {
  if (!user.dancerRole) {
    throw new Error('dancerRole is missing in user object');
  }

  const updatedEvent = cloneDeep(event);
  updatedEvent.dancers[
    user.dancerRole === 'leader' ? 'leaders' : 'followers'
  ].push({
    joinOn: new Date(),
    userId: user.id,
  });

  if (partner) {
    updatedEvent.dancers[
      partner.dancerRole === 'leader' ? 'leaders' : 'followers'
    ].push({
      joinOn: new Date(),
      userId: partner.id,
      by: 'partner',
    });
  }

  return updatedEvent;
};

export const getTotalDancers = (
  event: Pick<ClasseEvent, 'dancers'>
): number => {
  let total: number = 0;
  if (event.dancers.leaders?.length) {
    total += event.dancers.leaders?.length;
  }
  if (event.dancers.followers?.length) {
    total += event.dancers.followers?.length;
  }

  return total;
};

export const getLeaderDancerIds = (
  event?: Pick<ClasseEvent, 'dancers'>
): string[] => event?.dancers?.leaders?.map(({ userId }) => userId) || [];

export const getFollowerDancerIds = (
  event?: Pick<ClasseEvent, 'dancers'>
): string[] => event?.dancers?.followers?.map(({ userId }) => userId) || [];

export const getWaitingLeaderDancerIds = (
  event?: Pick<ClasseEvent, 'waitingList'>
): string[] => event?.waitingList?.leaders?.map(({ userId }) => userId) || [];

export const getWaitingFollowerDancerIds = (
  event?: Pick<ClasseEvent, 'waitingList'>
): string[] => event?.waitingList?.followers?.map(({ userId }) => userId) || [];

export const getParticipantsIds = (event: ClasseEvent) => ({
  leadersIds: getLeaderDancerIds(event),
  followersIds: getFollowerDancerIds(event),
  waitingLeadersIds: getWaitingLeaderDancerIds(event),
  waitingFollowersIds: getWaitingFollowerDancerIds(event),
});

export const shouldCheckBalance = (
  event: Pick<ClasseEvent, 'dancers'>,
  classe: Pick<Classe, 'spots'>,
  partner?: User
): boolean => (partner ? false : getTotalDancers(event) >= classe.spots.base);

export const isLimitOffsetReached = (
  event: Pick<ClasseEvent, 'dancers'>,
  classe: Pick<Classe, 'balanceOffset'>
): boolean => {
  const leadersAmount = getLeaderDancerIds(event).length;
  const followersAmount = getFollowerDancerIds(event).length;
  const offset = Math.abs(leadersAmount - followersAmount);

  return offset >= classe.balanceOffset;
};

export const isOppositeRoleInMajority = (event: ClasseEvent, user: User) => {
  const sameRoleAmount =
    user.dancerRole === 'leader'
      ? event.dancers.leaders?.length || 0
      : event.dancers.followers?.length || 0;
  const oppositeRoleAmount =
    user.dancerRole === 'leader'
      ? event.dancers.followers?.length || 0
      : event.dancers.leaders?.length || 0;

  return sameRoleAmount < oppositeRoleAmount;
};

export const isEventFull = (
  event: ClasseEvent,
  classe: Classe,
  partner?: User
): boolean => {
  const totalDancers = getTotalDancers(event);

  const max = classe.spots?.max ? classe.spots.max : 999;

  return partner
    ? totalDancers >= max - 1 // Since we need to have one more spot for the partner
    : totalDancers >= max;
};

export const getTotalWaitingList = (event: ClasseEvent): number =>
  (event?.waitingList?.leaders?.length || 0) +
  (event?.waitingList?.followers?.length || 0);

export const getIsUserInDancers = (
  event: ClasseEvent,
  currentUser: User
): boolean =>
  currentUser.dancerRole === 'leader'
    ? !!event?.dancers?.leaders?.find(({ userId }) => userId === currentUser.id)
    : !!event?.dancers?.followers?.find(
        ({ userId }) => userId === currentUser.id
      );

export const getIsUserInWaitingList = (
  event: ClasseEvent,
  user: User
): boolean =>
  user.dancerRole === 'leader'
    ? !!event.waitingList.leaders?.find(({ userId }) => userId === user.id)
    : !!event.waitingList.followers?.find(({ userId }) => userId === user.id);

export const getNewEvent = (
  users: User[],
  classData: Classe,
  dayDate: Dayjs,
  waitingUsers?: User[]
): NewClasseEvent => ({
  classId: classData.id,
  dancers: {
    leaders: users
      .filter((u) => u.dancerRole === 'leader')
      .map((u) => ({
        joinOn: new Date(),
        userId: u.id,
      })),
    followers: users
      .filter((u) => u.dancerRole === 'follower')
      .map((u) => ({
        joinOn: new Date(),
        userId: u.id,
      })),
  },
  waitingList: {
    leaders:
      waitingUsers
        ?.filter((u) => u.dancerRole === 'leader')
        .map((u) => ({
          joinOn: new Date(),
          userId: u.id,
        })) || [],
    followers:
      waitingUsers
        ?.filter((u) => u.dancerRole === 'follower')
        .map((u) => ({
          joinOn: new Date(),
          userId: u.id,
        })) || [],
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

const moveDancerFromWaitingList = (
  eventToUpdate: ClasseEventWithOptionalId,
  role: DancerRole = 'leader'
): { event: ClasseEventWithOptionalId; addedDancerId: string | null } => {
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

const moveDancersFromWaitingList = (
  event: ClasseEventWithOptionalId
): { event: ClasseEventWithOptionalId; movedDancerId: string | null } => {
  const {
    waitingList: { leaders: waitingLeaders, followers: waitingFollowers },
  } = event;
  if (waitingLeaders.length) {
    const { event: updatedEvent, addedDancerId: newAddedDancerId } =
      moveDancerFromWaitingList(event);

    return {
      event: updatedEvent,
      movedDancerId: newAddedDancerId,
    };
  }
  if (waitingFollowers.length) {
    const { event: updatedEvent, addedDancerId: newAddedDancerId } =
      moveDancerFromWaitingList(event, 'follower');
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

export const handleWaitingList = (
  event: ClasseEventWithOptionalId,
  classe: Classe
): {
  addedDancerIds: string[];
  updatedEvent: ClasseEventWithOptionalId;
} => {
  let clonedEvent = cloneDeep(event);

  let addedDancerIds: string[] = [];
  let shouldLoop = true;
  let counter = 0;

  while (shouldLoop) {
    counter++;

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
      (majority && !shouldCheckBalance(clonedEvent, classe)) ||
      (majority && !isLimitOffsetReached(clonedEvent, classe))
    ) {
      const { event, movedDancerId } = moveDancersFromWaitingList(clonedEvent);

      if (!movedDancerId) break;

      addedDancerIds.push(movedDancerId);
      clonedEvent = event;
      continue;
    } else if (majority === 'follower') {
      const { event, addedDancerId } = moveDancerFromWaitingList(
        clonedEvent,
        'leader'
      );

      if (!addedDancerId) break;

      addedDancerIds.push(addedDancerId);
      clonedEvent = event;
      continue;
    } else if (majority === 'leader') {
      const { event, addedDancerId } = moveDancerFromWaitingList(
        clonedEvent,
        'follower'
      );

      if (!addedDancerId) break;

      addedDancerIds.push(addedDancerId);
      clonedEvent = event;
      continue;
    }

    console.warn('Loop interrupted by end break (Should not happen)');
    break;
  } // End of while

  return {
    addedDancerIds,
    updatedEvent: clonedEvent,
  };
};

export const removeUserFromEvent = (
  event: ClasseEvent,
  user: User
): ClasseEvent => {
  const clonedEvent = cloneDeep(event);

  const isUserInWaitingListNewly = getIsUserInWaitingList(clonedEvent, user);
  const currentUserRoleKey =
    user.dancerRole === 'leader' ? 'leaders' : 'followers';
  const listKey = isUserInWaitingListNewly ? 'waitingList' : 'dancers';

  const userIdIndex = clonedEvent[listKey][currentUserRoleKey].findIndex(
    ({ userId }) => userId === user.id
  );
  clonedEvent[listKey][currentUserRoleKey].splice(userIdIndex as number, 1);

  return clonedEvent;
};

type GetUpdatedEventWithNewParticipantsParams = {
  event: ClasseEvent;
  newDancers: User[];
  newWaitingUsers: User[];
  role: DancerRole;
};
export const getUpdatedEventWithNewParticipants = ({
  event,
  newDancers,
  newWaitingUsers,
  role,
}: GetUpdatedEventWithNewParticipantsParams) => {
  const updatedEvent = cloneDeep(event);
  const list = role === 'leader' ? 'leaders' : 'followers';

  if (newDancers.length) {
    updatedEvent.dancers[list] = newDancers.map((newD) => ({
      joinOn: new Date(),
      userId: newD.id,
      by: 'admin',
    }));
  }
  if (newWaitingUsers.length) {
    updatedEvent.waitingList[list] = newWaitingUsers.map((newD) => ({
      joinOn: new Date(),
      userId: newD.id,
      by: 'admin',
    }));
  }

  return updatedEvent;
};

type GetNewEventWithParticipantsParams = {
  classe: Classe;
  newDancers: User[];
  newWaitingUsers: User[];
  role: DancerRole;
  date: Dayjs;
};
export const getNewEventWithParticipants = ({
  classe,
  newDancers,
  newWaitingUsers,
  role,
  date,
}: GetNewEventWithParticipantsParams) => {
  const list = role === 'leader' ? 'leaders' : 'followers';
  const newEvent = {
    classId: classe.id,
    dancers: {
      leaders:
        list === 'leaders'
          ? newDancers.map((d) => ({
              joinOn: new Date(),
              userId: d.id,
              by: 'admin',
            }))
          : [],
      followers:
        list === 'followers'
          ? newDancers.map((d) => ({
              joinOn: new Date(),
              userId: d.id,
              by: 'admin',
            }))
          : [],
    },
    waitingList: {
      leaders:
        list === 'leaders'
          ? newWaitingUsers.map((d) => ({
              joinOn: new Date(),
              userId: d.id,
              by: 'admin',
            }))
          : [],
      followers:
        list === 'followers'
          ? newWaitingUsers.map((d) => ({
              joinOn: new Date(),
              userId: d.id,
              by: 'admin',
            }))
          : [],
    },
    date: date.hour(0).minute(0).second(0).toDate(),
  };

  return newEvent;
};
