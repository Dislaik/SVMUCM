import { Career } from "./career";
import { UserStatus } from "./user-status";

export class VolunteerStudent {
  id: number;
  run: string;
  email: string;
  first_name: string;
  last_name: string;
  id_user_status: UserStatus;
  id_career: Career;
  created_at: Date;

  constructor(
    run: string = '',
    email: string = '',
    first_name: string = '',
    last_name: string = '',
    id_user_status: UserStatus = new UserStatus(),
    id_career: Career = new Career(),
    created_at: Date = new Date()
  ) {
    this.run = run;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.id_user_status = id_user_status;
    this.id_career = id_career;
    this.created_at = created_at;
  }
}
