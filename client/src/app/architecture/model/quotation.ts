import { Project } from "./project";
import { QuotationStatus } from "./quotation-status";

export class Quotation {
  id: number;
  id_project: Project;
  id_quotation_status: QuotationStatus;
  end_date: Date;
  created_at: Date;

  constructor(
    id_project: Project = new Project(), 
    id_quotation_status: QuotationStatus = new QuotationStatus(),
    end_date: Date = new Date(),
    created_at: Date = new Date()
  ) {
    this.id_project = id_project;
    this.id_quotation_status = id_quotation_status;
    this.end_date = end_date;
    this.created_at = created_at;
  } 
}
