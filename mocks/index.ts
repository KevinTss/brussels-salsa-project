import { faker } from '@faker-js/faker';
import { Timestamp } from 'firebase/firestore';

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
} from '../types';

const getMockedDancer = (): DancerJoin => ({
  joinOn: new Date(),
  userId: faker.internet.email(),
});
export const getMockedDancers = (amount: number = 1): DancerJoin[] =>
  Array.from(Array(amount).keys()).map(() => getMockedDancer());

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
  email: 'john.doe@email.com',
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
