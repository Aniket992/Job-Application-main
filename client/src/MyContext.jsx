import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); 
    }
  }, [user]);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
