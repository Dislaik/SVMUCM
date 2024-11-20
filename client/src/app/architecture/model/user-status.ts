export class UserStatus {
  id: number;
  name: String;
  label: String;

  constructor(
    name: String = '', 
    label: String = ''
  ) {
    this.name = name;
    this.label = label;
  } 
}
