export type Classe = {
  baseSpots: number;
  day: string;
  frequency: string;
  level: 'beginner' | 'improver';
  time: string;
  type: 'salsa';
};

export type Event = {
  id?: string;
  class: string;
  date: string;
  dancers: {
    female: string[];
    male: string[];
  };
};

export enum Weekday {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}
