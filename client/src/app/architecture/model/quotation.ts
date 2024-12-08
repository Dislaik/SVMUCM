import { Project } from "./project";
import { QuotationStatus } from "./quotation-status";

export class Quotation {
  id: number;
  id_project: Project;
  id_quotation_status: QuotationStatus;
  start_date: Date;
  end_date: Date;
  price: number;
  created_at: Date;

  constructor(
    id_project: Project = new Project(), 
    id_quotation_status: QuotationStatus = new QuotationStatus(),
    start_date: Date = new Date(),
    end_date: Date = new Date(),
    price: number = 0,
    created_at: Date = new Date()
  ) {
    this.id_project = id_project;
    this.id_quotation_status = id_quotation_status;
    this.start_date = start_date;
    this.end_date = end_date;
    this.price = price;
    this.created_at = created_at;
  } 
}
