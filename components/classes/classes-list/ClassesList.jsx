import ClassCard from '../class-card';
import { useClasses } from '../../../hooks';

const ClassesList = () => {
  const { list } = useClasses();

  return (
    <div>
      <ul>
        {list?.map((c) => (
          <ClassCard key={c.id} data={c} />
        ))}
      </ul>
    </div>
  );
};

export default ClassesList;
