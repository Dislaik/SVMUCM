import { UserStatus } from "./user-status";

export class VolunteerStudent {
  id: number;
  run: String;
  email: String;
  first_name: String;
  last_name: String;
  id_user_status: UserStatus;
  created_at: Date;

  constructor(
    run: String = '', 
    email: String = '',
    first_name: String = '',
    last_name: String = '',
    id_user_status: UserStatus = new UserStatus(),
    created_at: Date = new Date()
  ) {
    this.run = run;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.id_user_status = id_user_status;
    this.created_at = created_at;
  } 
}
