import { faker } from '@faker-js/faker';

import {
  Classe,
  ClasseFrequency,
  ClasseLevel,
  ClasseType,
  WeekDay,
  DancerJoin,
} from '../types';

export const MOCK_CLASSE: Classe = {
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

const getMockedDancer = (): DancerJoin => ({
  joinOn: new Date(),
  userId: faker.internet.email(),
});
export const getMockedDancers = (amount: number = 1): DancerJoin[] =>
  Array.from(Array(amount).keys()).map(() => getMockedDancer());

export const commonEventAttributes = {
  classId: faker.database.mongodbObjectId(),
  id: faker.database.mongodbObjectId(),
  date: new Date().toDateString(),
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
