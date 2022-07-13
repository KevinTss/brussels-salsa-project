import { faker } from '@faker-js/faker';
import { Timestamp } from 'firebase/firestore';
import cloneDeep from 'lodash.clonedeep';

import {
  Classe,
  ClasseFrequency,
  ClasseLevel,
  ClasseType,
  ClasseEvent,
  WeekDay,
  DancerJoin,
  User,
  ClasseEventWithOptionalId,
  DancerRole,
} from '../types';

const getNumberArray = (number: number) => Array.from(Array(number).keys());

const getMockedDancer = (): DancerJoin => ({
  joinOn: new Date(),
  userId: faker.internet.email(),
});
export const getMockedDancers = (amount: number = 1): DancerJoin[] =>
  getNumberArray(amount).map(() => getMockedDancer());

type CommonEventAttributes = {
  classId: ClasseEvent['classId'];
  id: ClasseEvent['id'];
  date: ClasseEvent['date'];
};
export const commonEventAttributes: CommonEventAttributes = {
  classId: faker.database.mongodbObjectId(),
  id: faker.database.mongodbObjectId(),
  date: new Timestamp(0, 0),
};
export const commonClasseAttributes = {
  day: WeekDay.MONDAY,
  frequency: ClasseFrequency.WEEKLY,
  id: faker.database.mongodbObjectId(),
  level: ClasseLevel.BEGINNER,
  time: new Date().toDateString(),
  type: ClasseType.SALSA,
  isArchived: false,
};

export const mockClasse: Classe = {
  balanceOffset: 1,
  day: WeekDay.MONDAY,
  frequency: ClasseFrequency.WEEKLY,
  id: faker.database.mongodbObjectId(),
  level: ClasseLevel.BEGINNER,
  spots: {
    base: 2,
  },
  time: new Date().toDateString(),
  type: ClasseType.SALSA,
  isArchived: false,
};
export const mockEventEmpty: ClasseEvent = {
  ...commonEventAttributes,
  dancers: {
    followers: [],
    leaders: [],
  },
  waitingList: {
    followers: [],
    leaders: [],
  },
};
export const mockUser: User = {
  accessToken: '',
  accounts: [],
  avatarUrl: null,
  dancerRole: 'leader',
  email: faker.internet.email(),
  fullName: 'John Doe',
  gender: 'male',
  id: 'qwertytrewq',
  isAdmin: false,
  levels: {
    bachata: 0,
    salsa: 0,
  },
  phone: null,
};

type GetMockUserOptions = {
  role?: DancerRole;
};
export const getMockUser = (options: GetMockUserOptions = {}) => {
  const mock = cloneDeep(mockUser);

  if (options.role) {
    mock.dancerRole = options.role;
  }

  return mock;
};

type GetMockEventOptions = {
  dancerLeaderAmount?: number;
  dancerFollowerAmount?: number;
  dancerLeaderWaitingAmount?: number;
  dancerFollowerWaitingAmount?: number;
};
export const getMockEvent = (options: GetMockEventOptions = {}) => {
  const mock = cloneDeep(mockEventEmpty);

  if (options.dancerLeaderAmount) {
    mock.dancers.leaders = getMockedDancers(options.dancerLeaderAmount);
  }
  if (options.dancerFollowerAmount) {
    mock.dancers.followers = getMockedDancers(options.dancerFollowerAmount);
  }
  if (options.dancerLeaderWaitingAmount) {
    mock.waitingList.leaders = getMockedDancers(
      options.dancerLeaderWaitingAmount
    );
  }
  if (options.dancerFollowerWaitingAmount) {
    mock.waitingList.followers = getMockedDancers(
      options.dancerFollowerWaitingAmount
    );
  }

  return mock;
};

type GetMockClasseOptions = {
  baseSpots?: number;
};
export const getMockClasse = (options: GetMockClasseOptions = {}) => {
  const mock = cloneDeep(mockClasse);

  if (options.baseSpots) {
    mock.spots.base = options.baseSpots;
  }

  return mock;
};
