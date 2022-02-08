export interface AuthContextData {
  // eslint-disable-next-line no-unused-vars
  signIn: (user: IUser) => void,
  signOut: () => void,
  updateEconomy: (newEconomy: number) => void;
  userLogged: DataState,
}

export interface DataState {
  user : IUser,
  signed: boolean
}

export interface IUser {
  email: string,
  password: string,
  balance: string,
  economy: number,
  annotation: string,
}
