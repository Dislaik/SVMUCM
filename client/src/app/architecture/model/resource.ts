export class Resource {
  id: number;
  name: string;
  label: string;
  description: string;
  price: number;
  created_at: Date;

  constructor(
    name: string = '', 
    label: string = '',
    description: string = '',
    price: number = 0,
    created_at: Date = new Date()
  ) {
    this.name = name;
    this.label = label;
    this.description = description;
    this.price = price;
    this.created_at = created_at;
  } 
}
