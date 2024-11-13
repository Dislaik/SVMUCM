import { Role } from "./role";

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  id_role: Role;
  image: string;
  created_at: Date;

  constructor(
    username: string = '',
    password: string = '',
    email: string = '',
    first_name: string = '',
    last_name: string = '',
    address: string = '',
    phone: string = '',
    id_role: Role = new Role(),
    image: string = '',
    created_at: Date = new Date
  ){
    this.username = username;
    this.password = password;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    this.phone = phone;
    this.id_role = id_role;
    this.image = image;
    this.created_at = created_at;
  }
}