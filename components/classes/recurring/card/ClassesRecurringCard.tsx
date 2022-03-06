import { Card } from './style';
import { ClasseTypeEnum, WeekDayEnum } from '../../../../types';

type ClassesRecurringCardProps = {
  day: WeekDayEnum;
  time: string;
  type: ClasseTypeEnum;
};

export default function ClassesRecurringCard({
  day,
  type,
  time,
}: ClassesRecurringCardProps) {
  return <Card>{`Classe of ${type} on ${day} at ${time}`}</Card>;
}
