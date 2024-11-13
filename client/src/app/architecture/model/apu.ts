export class APU {
  id: number;
  name: string;
  label: string;
  description: string;
  created_at: Date;

  constructor(
    name: string = '', 
    label: string = '',
    description: string = '',
    created_at: Date = new Date()
  ) {
    this.name = name;
    this.label = label;
    this.description = description;
    this.created_at = created_at;
  } 
}
