import { useContext } from 'react';

import { EventsContext } from '../contexts';

export const useEvents = () => useContext(EventsContext);
