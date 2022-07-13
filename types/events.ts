import { Timestamp } from 'firebase/firestore';

export type DancerJoin = {
  joinOn: Date;
  userId: string;
  wasPresent?: boolean;
  by?: 'admin';
};
export type Dancers = {
  leaders: DancerJoin[];
  followers: DancerJoin[];
};

export type NewClasseEvent = {
  classId: string;
  date: Date;
  dancers: Dancers;
  waitingList: Dancers;
};

export type ClasseEvent = {
  id: string;
  classId: string;
  date: Timestamp;
  dancers: Dancers;
  waitingList: Dancers;
};

export type ClasseEventWithOptionalId = {
  id?: string;
  classId: string;
  date: Timestamp;
  dancers: Dancers;
  waitingList: Dancers;
};

export type ClasseEventUpdate = {
  dancers?: Dancers;
  waitingList?: Dancers;
};

export type ClasseEventFetchOneParams =
  | {
      eventId: string;
    }
  | {
      classId: string;
      dateFrom: Date;
      dateTo: Date;
    };
