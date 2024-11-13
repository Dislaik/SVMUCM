import { Project } from "./project";
import { APU } from "./apu";

export class ProjectAPU {
  id: number;
  id_project: Project;
  id_apu: APU;
  created_at: Date;

  constructor(
    id_project: Project = new Project(),
    id_apu: APU = new APU(),
    created_at: Date = new Date()
  ) {
    this.id_project = id_project;
    this.id_apu = id_apu;
    this.created_at = created_at;
  } 
}
