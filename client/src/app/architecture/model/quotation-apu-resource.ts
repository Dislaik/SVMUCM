import { APU } from "./apu";
import { Quotation } from "./quotation";
import { Resource } from "./resource";

export class QuotationAPUResource {
  id: number;
  id_quotation: Quotation;
  id_apu: APU;
  id_resource: Resource;
  uuid: string;
  amount: number;
  price: number;
  subtotal: number;
  created_at: Date;

  constructor(
    id_quotation: Quotation = new Quotation(),
    id_apu: APU = new APU(),
    id_resource: Resource = new Resource(),
    uuid: string = '',
    amount: number = 1,
    price: number = 0,
    subtotal: number = 0,
    created_at: Date = new Date()
  ) {
    this.id_quotation = id_quotation;
    this.id_apu = id_apu;
    this.id_resource = id_resource;
    this.uuid = uuid;
    this.amount = amount;
    this.price = price;
    this.subtotal = subtotal;
    this.created_at = created_at;
  } 
}
