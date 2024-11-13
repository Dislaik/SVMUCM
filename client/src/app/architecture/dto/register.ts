export class Register {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;

  constructor(username: string, password: string, repeatPassword: string, email: string, firstName: string, lastName: string, address: string, phone: string) {
    this.username = username;
    this.password = password;
    this.repeatPassword = repeatPassword;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phone = phone;
  }
}
