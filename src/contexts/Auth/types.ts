export interface AuthContextData {
  // eslint-disable-next-line no-unused-vars
  signIn: (user: DataState) => void,
  signOut: () => void,
  userLogged: DataState,
}

export interface DataState {
  user : {
    email: string,
    password: string,
    balance: string
  }
  signed: boolean
}

