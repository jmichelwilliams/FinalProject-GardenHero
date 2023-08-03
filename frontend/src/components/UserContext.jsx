import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    const parsedUser = JSON.parse(storedUser);
    return parsedUser || null;
  });

  const contextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser],
  );
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
