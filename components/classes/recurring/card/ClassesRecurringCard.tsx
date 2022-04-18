import { Card } from './style';
import { ClasseLevel, ClasseType, WeekDay } from '../../../../types';
import { getDisplayClasseLevel } from '../../../../utils'

type ClassesRecurringCardProps = {
  day: WeekDay;
  time: string;
  type: ClasseType;
  level: ClasseLevel
};

export default function ClassesRecurringCard({
  day,
  type,
  time,
  level
}: ClassesRecurringCardProps) {
  return <Card>{`Classe of ${type} (${getDisplayClasseLevel(level)}) on ${day} at ${time}`}</Card>;
}
