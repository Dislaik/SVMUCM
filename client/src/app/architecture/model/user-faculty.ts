import { Faculty } from "./faculty";
import { User } from "./user";

export class UserFaculty {
  id: number;
  id_user: User;
  id_faculty: Faculty;
  created_at: Date;

  constructor(
    id_user: User = new User(),
    id_faculty: Faculty = new Faculty(),
    created_at: Date = new Date()
  ) {
    this.id_user = id_user;
    this.id_faculty = id_faculty;
    this.created_at = created_at;
  } 
}
