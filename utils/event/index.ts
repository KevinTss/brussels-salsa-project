import { Dayjs } from 'dayjs';
import { User, Classe, NewClasseEvent, ClasseEvent } from '../../types';

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
  (event.waitingList?.leaders?.length || 0) +
  (event.waitingList?.followers?.length || 0);

export const isUserInDancers = (
  event: ClasseEvent,
  currentUser: User
): boolean =>
  currentUser.danceRole === 'leader'
    ? !!event?.dancers?.leaders?.find(({ userId }) => userId === currentUser.id)
    : !!event?.dancers?.followers?.find(
        ({ userId }) => userId === currentUser.id
      );

export const isUserInWaitingList = (
  event: ClasseEvent,
  currentUser: User
): boolean =>
  currentUser?.danceRole === 'leader'
    ? !!event?.waitingList?.leaders?.find(
        ({ userId }) => userId === currentUser.id
      )
    : !!event?.waitingList?.followers?.find(
        ({ userId }) => userId === currentUser.id
      );

export const getNewEvent = (
  user: User,
  classData: Classe,
  dayDate: Dayjs
): NewClasseEvent => ({
  classId: classData.id,
  dancers: {
    leaders:
      user.danceRole === 'leader'
        ? [
            {
              joinOn: new Date(),
              userId: user.id,
            },
          ]
        : [],
    followers:
      user.danceRole === 'follower'
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
