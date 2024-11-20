import { Role } from "./role";
import { UserStatus } from "./user-status";

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  image: string;
  id_role: Role;
  id_user_status: UserStatus;
  created_at: Date;

  constructor(
    username: string = '',
    password: string = '',
    email: string = '',
    first_name: string = '',
    last_name: string = '',
    address: string = '',
    phone: string = '',
    image: string = '',
    id_role: Role = new Role(),
    id_user_status = new UserStatus(),
    created_at: Date = new Date
  ){
    this.username = username;
    this.password = password;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    this.phone = phone;
    this.image = image;
    this.id_role = id_role;
    this.id_user_status = id_user_status;
    this.created_at = created_at;
  }
}