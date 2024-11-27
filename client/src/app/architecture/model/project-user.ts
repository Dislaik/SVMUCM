import { Project } from "./project";
import { User } from "./user";

export class ProjectUser {
  id: number;
  id_project: Project;
  id_user: User;
  created_at: Date;

  constructor(
    id_project: Project = new Project(),
    id_user: User = new User(),
    created_at: Date = new Date()
  ) {
    this.id_project = id_project;
    this.id_user = id_user;
    this.created_at = created_at;
  } 
}
