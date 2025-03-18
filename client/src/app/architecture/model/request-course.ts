import { Headquarter } from "./headquarter";
import { User } from "./user";

export class RequestCourse {
  title: string;
  id_headquarter: Headquarter;
  duration: string;
  mode: string;
  availableSchedule: string;
  id_user: User;
  reason: string;
  created_at: Date;

  constructor(
      title: string = '', 
      id_headquarter: Headquarter = new Headquarter(),
      duration: string = '',
      mode: string = '',
      availableSchedule: string = '{}',
      id_user: User = new User(),
      reason: string = '',
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
