import { Region } from "./region";

export class City {
  id: number
  name: string;
  label: string;
  id_region: Region;
  created_at: Date;

  constructor(
    name: string = '', 
    label: string = '',
    id_region: Region = new Region(),
    created_at: Date = new Date()
  ) {
    this.name = name;
    this.label = label;
    this.id_region = id_region;
    this.created_at = created_at;
  }
}
