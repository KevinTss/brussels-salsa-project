import { useContext } from 'react';

import { ClassesContext } from '../contexts';

export const useClasses = () => useContext(ClassesContext);
