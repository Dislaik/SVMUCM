import { Role } from "./role";

export class User {
  username: String;
  password: String;
  email: String;
  first_name: String;
  last_name: String;
  image: String;
  id_role: Role;
  created_at: Date;

  constructor(
    username: String = '',
    password: String = '',
    email: String = '',
    first_name: String = '',
    last_name: String = '',
    image: String = '',
    id_role: Role = new Role(),
    created_at: Date = new Date
  ){
    this.username = username;
    this.password = password;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.image = image;
    this.id_role = id_role;
    this.created_at = created_at;
  }
}