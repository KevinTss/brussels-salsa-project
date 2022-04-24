import { Dayjs } from 'dayjs';
import {
  User,
  Classe,
  NewClasseEvent,
  ClasseEvent,
  ClasseLevel,
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
              joinOn: new Date(),
              userId: user.id,
            },
          ]
        : [],
    followers:
      user.dancerRole === 'follower'
        ? [
            {
              joinOn: new Date(),
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
