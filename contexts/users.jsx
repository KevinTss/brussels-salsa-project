import { createContext, useState } from 'react';

export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [list, setList] = useState([]);

  const add = (newUser) => {
    const userIndex = list.findIndex((user) => user.id === newUser.id);

    if (userIndex > -1) return;

    setList([...list, newUser]);
  };

  const getById = (id) => {
    console.log('aaaa', list, id);
    const userIndex = list.findIndex((user) => user.id === id);
    console.log('user index', userIndex);
    if (userIndex === -1) return null;
    console.log('list[userIndex];', list[userIndex]);
    return list[userIndex];
  };

  return (
    <UsersContext.Provider value={{ list, add, getById }}>
      {children}
    </UsersContext.Provider>
  );
};
