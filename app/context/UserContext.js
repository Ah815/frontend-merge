// import { createContext } from "react";

// export const UserContext = createContext(null)

// context/UserContext.js
import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
