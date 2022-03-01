export const getMalesDancerIds = (event) => event?.dancers?.males || [];

export const getFemalesDancerIds = (event) => event?.dancers?.females || [];

export const getTotalDancers = (event) =>
  event?.dancers?.males && event?.dancers?.females
    ? event.dancers.males.length + event.dancers.females.length
    : 0;

export const getTotalWaitingList = (event) =>
  (event?.waitingList?.males?.length || 0) +
  (event?.waitingList?.females?.length || 0);

export const getIsUserInDancers = (event, currentUser) =>
  currentUser.gender === 'male'
    ? !!event?.dancers?.males?.find(({ userId }) => userId === currentUser.id)
    : !!event?.dancers?.females?.find(
        ({ userId }) => userId === currentUser.id
      );

export const getIsUserInWaitingList = (event, currentUser) =>
  currentUser?.gender === 'male'
    ? !!event?.waitingList?.males?.find(
        ({ userId }) => userId === currentUser.id
      )
    : !!event?.waitingList?.females?.find(
        ({ userId }) => userId === currentUser.id
      );

export const getNewEvent = (currentUser, classData, dayDate) => ({
  classId: classData.id,
  dancers: {
    males:
      currentUser.gender === 'male'
        ? [
            {
              joinOn: new Date(),
              userId: currentUser.id,
            },
          ]
        : [],
    females:
      currentUser.gender === 'female'
        ? [
            {
              joinOn: new Date(),
              userId: currentUser.id,
            },
          ]
        : [],
  },
  waitingList: {
    males: [],
    females: [],
  },
  date: dayDate.hour(0).minute(0).second(0).toDate(),
});
