import { Faculty } from "./faculty";
import { Headquarter } from "./headquarter";

export class Career {
  name: String;
  label: String;
  id_faculty: Faculty;
  id_headquarter: Headquarter;

  constructor(
    name: String = '', 
    label: String = '',
    id_faculty: Faculty = new Faculty(),
    id_headquarter: Headquarter = new Headquarter()
  ) {
    this.name = name;
    this.label = label;
    this.id_faculty = id_faculty;
    this.id_headquarter = id_headquarter;
  } 
}
