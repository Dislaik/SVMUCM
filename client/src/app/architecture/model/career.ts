import { Faculty } from "./faculty";
import { Headquarter } from "./headquarter";

export class Career {
  id: number;
  name: string;
  label: string;
  id_faculty: Faculty;
  id_headquarter: Headquarter;

  constructor(
    name: string = '', 
    label: string = '',
    id_faculty: Faculty = new Faculty(),
    id_headquarter: Headquarter = new Headquarter()
  ) {
    this.name = name;
    this.label = label;
    this.id_faculty = id_faculty;
    this.id_headquarter = id_headquarter;
  } 
}
