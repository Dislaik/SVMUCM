export class Register {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  firstName: string;
  lastName: string

  constructor(username: string, password: string, repeatPassword: string, email: string, firstName: string, lastName: string) {
    this.username = username;
    this.password = password;
    this.repeatPassword = repeatPassword;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
