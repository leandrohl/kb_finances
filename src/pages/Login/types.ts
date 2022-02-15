/* eslint-disable max-classes-per-file */
/* eslint-disable lines-between-class-members */
export class LoginInfo {
  email = ''
  password = ''
  error: LoginError = new LoginError()
}

export class LoginError {
  email = ''
  password = ''
}
