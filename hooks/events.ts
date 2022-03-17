import { useContext } from 'react';

import { EventsContext } from '../contexts';
import { EventsContext as EventsContextType } from '../types';

export const useEvents = () => {
  const data = useContext<EventsContextType>(EventsContext);

  const typedData: EventsContextType = {
    fetch: data?.fetch || (() => {}),
    fetchOne: data?.fetchOne || (() => {}),
    add: data?.add || (() => {}),
    update: data?.update || (() => {}),
  };

  return typedData;
};
