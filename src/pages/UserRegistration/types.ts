export class RegisterInfo {
  name = ''
  email = ''
  password = ''
  error: RegisterError = new RegisterError()
}

export class RegisterError {
  name = ''
  email = ''
  password = ''
}
