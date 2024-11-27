import { Region } from "./region";

export class City {
  id: number
  name: String;
  label: String;
  id_region: Region

  constructor(
    name: String = '', 
    label: String = '',
    id_region: Region = new Region()
  ) {
    this.name = name;
    this.label = label;
    this.id_region = id_region;
  }
}
