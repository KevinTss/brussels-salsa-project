import { Classe, ClasseEvent, User } from '../../../../../types';
import { isUserInDancers, isUserInWaitingList } from '../../../../../utils';

export const addUserToDancers = (
  event: ClasseEvent,
  user: User
): ClasseEvent => {
  const updatedEvent = { ...event };
  updatedEvent.dancers[
    user.dancerRole === 'leader' ? 'leaders' : 'followers'
  ]?.push({
    joinOn: new Date(),
    userId: user.id,
  });

  return updatedEvent;
};

export const addUserToEvent = (event: ClasseEvent, user: User): ClasseEvent => {
  const isUserLeader = user.dancerRole === 'leader';
  const updatedEvent = { ...event };
  const sameRoleAmount = isUserLeader
    ? updatedEvent.dancers.leaders?.length || 0
    : updatedEvent.dancers.followers?.length || 0;
  const oppositeRoleAmount = isUserLeader
    ? updatedEvent.dancers.followers?.length || 0
    : updatedEvent.dancers.leaders?.length || 0;
  let listToAddTheNewDancer: 'waitingList' | 'dancers';
  if (sameRoleAmount > oppositeRoleAmount) {
    listToAddTheNewDancer = `waitingList`;
  } else {
    listToAddTheNewDancer = `dancers`;
  }
  updatedEvent[listToAddTheNewDancer][
    isUserLeader ? 'leaders' : 'followers'
  ].push({
    joinOn: new Date(),
    userId: user.id,
  });

  return updatedEvent;
};

export const addUserToWaitingList = (
  event: ClasseEvent,
  user: User
): ClasseEvent => {
  const updatedEvent = { ...event };
  updatedEvent.waitingList[
    user.dancerRole === 'leader' ? 'leaders' : 'followers'
  ].push({
    joinOn: new Date(),
    userId: user.id,
  });

  return updatedEvent;
};

export const handleWaitingList = (
  event: ClasseEvent,
  classe: Classe
): ClasseEvent => {
  const updatedEvent = { ...event };
  const leadersAmount = updatedEvent.dancers.leaders.length;
  const followersAmount = updatedEvent.dancers.followers.length;
  const totalDancers = leadersAmount + followersAmount;

  if (totalDancers >= (classe.spots?.max || 999)) return updatedEvent;

  let shouldLoop = true;
  while (shouldLoop) {
    // if (totalDancers >= (classe.spots?.max || 999)) {
    //   break;
    // };

    /**
     * The difference max should be the `balanceOffset`
     * e.g.
     * - leaders: 4
     * - followers: 2
     * -> difference is 2
     * So 2 is superior to 1 (max balance offset)
     */
    const differenceDancers = leadersAmount - followersAmount;
    const differenceDancersAbs = Math.abs(differenceDancers);
  }

  // offset 3
  // leader: 12
  // followers: 9
  // diff -> 3

  if (differenceDancersAbs > classe.balanceOffset) return updatedEvent;

  const freeSpots = differenceDancersAbs;

  // NEED TO DO RECURSIVE FUNCTION (not recursive but a while condition)
  // adding one by one till the balance is ok
  // concept of `isBalanceOK`

  return updatedEvent;
};

export const removeUserFromEvent = (
  event: ClasseEvent,
  user: User
): ClasseEvent => {
  const updatedEvent = { ...event };

  const isUserInWaitingListNewly = isUserInWaitingList(updatedEvent, user);
  const currentUserRoleKey =
    user.dancerRole === 'leader' ? 'leaders' : 'followers';
  const listKey = isUserInWaitingListNewly ? 'waitingList' : 'dancers';

  const userIdIndex = updatedEvent[listKey][currentUserRoleKey]?.findIndex(
    ({ userId }) => userId === user.id
  );
  updatedEvent[listKey][currentUserRoleKey]?.splice(userIdIndex as number, 1);

  return updatedEvent;
};
