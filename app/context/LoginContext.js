// import { createContext } from "react";


// export const LoginContext = createContext(null)
import React, { createContext, useState } from 'react';

// Create the context
export const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
