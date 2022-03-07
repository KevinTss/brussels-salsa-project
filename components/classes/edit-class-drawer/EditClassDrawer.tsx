import { Dialog } from '../../ui';
import CreateClassForm from '../form';
import { Title, Text } from '../../../styles/GlobalStyle';
import { Header } from './style';
import { useClasses } from '../../../hooks';
import { useMemo } from 'react';

type EditClassDrawer = {
  classeId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditClassDrawer({
  isOpen,
  onClose,
  classeId,
}: EditClassDrawer) {
  const { getById } = useClasses();

  const classeToEdit = useMemo(() => getById(classeId), [classeId, getById]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} type='aside'>
      <Header>
        <Title>Edit the recurring class</Title>
        <Text>
          {`You are editing the `}
          <b>{(classeToEdit?.type as string | undefined)?.toLowerCase()}</b>
          {` classe of `}
          <b>{classeToEdit?.day}</b>
          {` at `}
          <b>{classeToEdit?.time}</b>
        </Text>
      </Header>
      <CreateClassForm onClose={onClose} defaultValues={classeToEdit} />
    </Dialog>
  );
}
