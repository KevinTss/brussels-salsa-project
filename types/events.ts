import { DocumentReference } from 'firebase/firestore';

export type DancerJoinType = {
  joinOn: Date;
  userId: string;
};
export type DancersListType = {
  males?: DancerJoinType[];
  females?: DancerJoinType[];
};

export type NewEventData = {
  classId: string;
  date: string;
  dancers: DancersListType;
  waitingList?: DancersListType;
};

export type EventType = {
  id?: string;
  classId: string;
  date: string;
  dancers: DancersListType;
  waitingList?: DancersListType;
};

export type EventFetchOneParams = {
  classId: string;
  dateFrom: Date;
  dateTo: Date;
  eventId?: string;
};

export type EventsContext = {
  fetch: (dateFrom: Date, dateTo: Date) => Promise<EventType[]>;
  fetchOne: (data: EventFetchOneParams) => Promise<EventType | null>;
  update: (id: string, data: NewEventData) => Promise<void>;
  add: (data: NewEventData) => Promise<DocumentReference>;
};
