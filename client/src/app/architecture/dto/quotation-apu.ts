import { APU } from "../model/apu";
import { QuotationAPUResource } from "../model/quotation-apu-resource";

export class QuotationAPU {
    id_apu: APU;
    id_quotation_apu_resource: QuotationAPUResource[];

    constructor(id_apu: APU, id_quotation_apu_resource: QuotationAPUResource[]) {
        this.id_apu = id_apu
        this.id_quotation_apu_resource = id_quotation_apu_resource;
    }
}
