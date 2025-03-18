import { Project } from "./project";
import { VolunteerStudent } from "./volunteer-student";

export class ProjectVolunteerStudent {
  id: number;
  id_project: Project;
  id_volunteer_student: VolunteerStudent;
  created_at: Date;

  constructor(
    id_project: Project = new Project(),
    id_volunteer_student: VolunteerStudent = new VolunteerStudent(),
    created_at: Date = new Date()
  ) {
    this.id_project = id_project;
    this.id_volunteer_student = id_volunteer_student;
    this.created_at = created_at;
  } 
}
