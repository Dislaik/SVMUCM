import { Project } from "./project";
import { QuotationStatus } from "./quotation-status";

export class Quotation {
  id: number;
  id_project: Project;
  id_quotation_status: QuotationStatus;
  durationDay: number;
  created_at: Date;

  constructor(
    id_project: Project = new Project(), 
    id_quotation_status: QuotationStatus = new QuotationStatus(),
    durationDay: number = 10,
    created_at: Date = new Date()
  ) {
    this.id_project = id_project;
    this.id_quotation_status = id_quotation_status;
    this.durationDay = durationDay;
    this.created_at = created_at;
  } 
}
