export interface AuthContextData {
  // eslint-disable-next-line no-unused-vars
  signIn: (user: IUser) => void,
  signOut: () => void,
  userLogged: DataState,
}

export interface DataState {
  user : IUser,
  signed: boolean
}

export interface IUser {
  name: string,
  email: string,
  password: string,
  balance: string,
  economy: number,
  annotation: string,
}
