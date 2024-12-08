import { Career } from "./career";
import { City } from "./city";
import { ProjectStatus } from "./project-status";
import { User } from "./user";

export class Project {
  id: number;
  name: string;
  description: string;
  id_user: User;
  start_date: Date;
  end_date: Date;
  id_career: Career;
  id_city: City;
  id_projectStatus: ProjectStatus
  created_at: Date;

  constructor(
    name: string = '', 
    description: string = '',
    id_user: User = new User(),
    start_date: Date = new Date(),
    end_date: Date = new Date(),
    id_career: Career = new Career(),
    id_city: City = new City(),
    id_projectStatus: ProjectStatus = new ProjectStatus(),
    created_at: Date = new Date()
  ) {
    this.name = name;
    this.description = description;
    this.id_user = id_user;
    this.start_date = start_date;
    this.end_date = end_date;
    this.id_career = id_career;
    this.id_city = id_city;
    this.id_projectStatus = id_projectStatus;
    this.created_at = created_at;
  } 
}
