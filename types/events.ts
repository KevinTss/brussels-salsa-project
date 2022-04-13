import { DocumentReference } from 'firebase/firestore';

export type DancerJoin = {
  joinOn: Date;
  userId: string;
};
export type DancersList = {
  leaders?: DancerJoin[];
  followers?: DancerJoin[];
};

export type NewEvent = {
  classId: string;
  date: string;
  dancers: DancersList;
};

export type ClasseEvent = {
  id: string;
  classId: string;
  date: string;
  dancers: DancersList;
  waitingList?: DancersList;
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

export type EventsContext = {
  fetch: (dateFrom: Date, dateTo: Date) => Promise<ClasseEvent[]>;
  fetchOne: (data: ClasseEventFetchOneParams) => Promise<ClasseEvent | null>;
  update: (id: string, data: ClasseEvent) => Promise<void>;
  add: (data: ClasseEvent) => Promise<DocumentReference>;
};
