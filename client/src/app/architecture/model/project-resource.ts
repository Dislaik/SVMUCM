export class ProjectResource {
  name: string;
  label: string;
  description: string;
  price: number;

  constructor(
    name: string = '', 
    label: string = '',
    description: string = '',
    price: number = 0
  ) {
    this.name = name;
    this.label = label;
    this.description = description;
    this.price = price;
  } 
}
