import { useClasses } from '../../../../hooks';
import {
  Table,
  THead,
  TBody,
  TR,
  TD,
  TH,
  ActionContainer,
  MenuContainer,
} from './style';
import { Dropdown, Button } from '../../../ui';
import ClassesRecurringCard from '../card';

type ClassesRecurringListProps = {
  onEdit: (id: string) => void;
};

export default function ClassesRecurringList({
  onEdit,
}: ClassesRecurringListProps) {
  const { list, deleteById } = useClasses();

  return (
    <Table>
      <THead>
        <TR>
          <TH>Recurring classes</TH>
          <TH right />
        </TR>
      </THead>
      <TBody>
        {list.map(({ id, day, time, type, level }) => (
          <TR key={id}>
            <TD>
              <ClassesRecurringCard day={day} type={type} time={time} level={level} />
            </TD>
            <TD>
              <ActionContainer>
                <Dropdown
                  content={
                    <MenuContainer>
                      <Button
                        onClick={() => onEdit(id as string)}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteById(id as string)}
                        iconLeft='trash'
                      >
                        Delete
                      </Button>
                    </MenuContainer>
                  }
                >
                  <Button
                    iconLeft='menu'
                  />
                </Dropdown>
              </ActionContainer>
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
