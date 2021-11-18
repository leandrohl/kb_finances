/* eslint-disable arrow-body-style */
import React, { createContext, useContext, useState } from 'react';
import { AuthContextData, DataState } from './types';

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<DataState>(() => {
    // const userString = localStorage.getItem('user');
    // const user = userString && JSON.parse(userString);
    // const { user_type } = user || {};
    // const token = localStorage.getItem(tokenKeyByType[user_type as keyof typeof tokenKeyByType]);

    // if (token) return { user, token };

    return {} as DataState;
  });

  const signIn = (user: DataState) => {
    // function to save user and token in local storage
    // setUserToken({ user, token });
    // update state to save user logged in context provider
    setUser(user);
    // eslint-disable-next-line no-console
  };

  const signOut = () => {
    // localStorage.removeItem('user');
    // localStorage.removeItem(tokenKeyByType[data.user.user_type]);
    setUser({} as DataState);

  };

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      userLogged: user
    }}
    >
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
