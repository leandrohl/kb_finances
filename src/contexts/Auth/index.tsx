import React, { createContext, useContext } from 'react';
import { AuthContextData } from './types';

export const AuthContext = createContext({});

export const AuthProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider value={{} as AuthContextData}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
