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
        {list.map(({ id, day, time, type }) => (
          <TR key={id}>
            <TD>
              <ClassesRecurringCard day={day} type={type} time={time} />
            </TD>
            <TD>
              <ActionContainer>
                <Dropdown
                  content={
                    <MenuContainer>
                      <Button
                        onClick={() => onEdit(id as string)}
                        appearance={undefined}
                        iconLeft={undefined}
                        iconRight={undefined}
                        isDisabled={undefined}
                        isLoading={undefined}
                        isIconReverse={undefined}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteById(id as string)}
                        appearance={undefined}
                        iconLeft='trash'
                        iconRight={undefined}
                        isDisabled={undefined}
                        isLoading={undefined}
                        isIconReverse={undefined}
                      >
                        Delete
                      </Button>
                    </MenuContainer>
                  }
                >
                  <Button
                    iconLeft='menu'
                    appearance={undefined}
                    // eslint-disable-next-line react/no-children-prop
                    children={undefined}
                    iconRight={undefined}
                    isDisabled={undefined}
                    isLoading={undefined}
                    isIconReverse={undefined}
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
