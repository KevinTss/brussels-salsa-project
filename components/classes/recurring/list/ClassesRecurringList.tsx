import ClassCard from '../../class-card';
import { useClasses } from '../../../../hooks';
import { ClasseType } from '../../../../types';

export default function ClassesRecurringList() {
  const { list } = useClasses();

  return (
    <div>
      {list.map((i) => (
        <p key={i.id}>{i.id}</p>
      ))}
    </div>
  );
}
