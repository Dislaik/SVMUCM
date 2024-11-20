import { Faculty } from "./faculty";
import { Headquarter } from "./headquarter";

export class Career {
  id: number;
  name: string;
  label: string;
  id_headquarter: Headquarter;
  id_faculty: Faculty;

  constructor(
    name: string = '', 
    label: string = '',
    id_headquarter: Headquarter = new Headquarter(),
    id_faculty: Faculty = new Faculty()
  ) {
    this.name = name;
    this.label = label;
    this.id_headquarter = id_headquarter;
    this.id_faculty = id_faculty;
  } 
}
