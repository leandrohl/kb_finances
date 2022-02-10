/* eslint-disable arrow-body-style */
import React, { createContext, useContext, useEffect, useState } from 'react'

import StorageLocal from '../../utils/StorageLocal'
import { AuthContextData, DataState, IUser } from './types'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const storageLocal = new StorageLocal()

  const USER_GET = '@kb_finances'

  const [user, setUser] = useState<DataState>({} as DataState)

  useEffect(() => {
    const user = getUserSession()

    if (user) {
      setUser({
        user,
        signed: true
      })
    }
  }, [])

  const updateEconomy = (newEconomy: number) => {
    setUser({
      user: {
        ...user.user,
        economy: newEconomy
      },
      signed: user.signed
    })
  }

  const getUserSession = (): IUser | null => {
    const session = storageLocal.getLocalStorage<IUser>(USER_GET)
    if (session) {
      return session
    }
    return null
  }

  const signIn = (user: IUser) => {
    storageLocal.setLocalStorage(USER_GET, user)
    setUser({ user, signed: true })
  }

  const signOut = () => {
    setUser({} as DataState)
    storageLocal.cleanLocalStorage()
    window.location.replace('/login')
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      updateEconomy,
      userLogged: user
    }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
