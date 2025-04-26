import { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext easily
export const useUser = () => useContext(UserContext);

// Context Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    email: null,
    session: null
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
