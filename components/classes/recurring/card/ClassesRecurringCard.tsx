import { Card } from './style';
import { ClasseType, WeekDay } from '../../../../types';

type ClassesRecurringCardProps = {
  day: WeekDay;
  time: string;
  type: ClasseType;
};

export default function ClassesRecurringCard({
  day,
  type,
  time,
}: ClassesRecurringCardProps) {
  return <Card>{`Classe of ${type} on ${day} at ${time}`}</Card>;
}
