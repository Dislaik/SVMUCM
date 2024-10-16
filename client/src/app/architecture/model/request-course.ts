import { Headquarter } from "./headquarter";
import { User } from "./user";

export class RequestCourse {
  title: String;
  id_headquarter: Headquarter;
  duration: String;
  mode: String;
  availableSchedule: String;
  id_user: User;
  reason: String;
  created_at: Date;

  constructor(
      title: String = '', 
      id_headquarter: Headquarter = new Headquarter(),
      duration: String = '',
      mode: String = '',
      availableSchedule: String = '{}',
      id_user: User = new User(),
      reason: String = '',
      created_at: Date = new Date()
  ) {
      this.title = title;
      this.id_headquarter = id_headquarter;
      this.duration = duration;
      this.mode = mode;
      this.availableSchedule = availableSchedule;
      this.id_user = id_user;
      this.reason = reason;
      this.created_at = created_at;
  }
}
