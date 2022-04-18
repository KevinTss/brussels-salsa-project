import { Classe, WeekDay } from '../../../types';
import { normalize } from '../../../utils';

export const getDayClasses = (classes: Classe[], weekDay: WeekDay): Classe[] =>
  classes.filter(({ day }) => normalize(day) === normalize(weekDay));
