import { Region } from "./region";

export class City {
  name: String;
  label: String;
  region: Region

  constructor(
    name: String = '', 
    label: String = '',
    region: Region = new Region()
  ) {
    this.name = name;
    this.label = label;
    this.region = region;
  }
}
