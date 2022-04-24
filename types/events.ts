import { DocumentReference } from 'firebase/firestore';

export type DancerJoin = {
  joinOn: string;
  userId: string;
  wasPresent?: boolean;
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
  date: string;
  dancers: Dancers;
  waitingList: Dancers;
};

export type UpdateClasseEvent = {
  classId?: string;
  date?: string;
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

export type EventsContext = {
  fetch: (dateFrom: Date, dateTo: Date) => Promise<ClasseEvent[]>;
  fetchOne: (data: ClasseEventFetchOneParams) => Promise<ClasseEvent | null>;
  update: (id: string, data: ClasseEvent) => Promise<void>;
  add: (data: NewClasseEvent) => Promise<DocumentReference>;
};
