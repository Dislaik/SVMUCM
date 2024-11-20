import { APU } from "./apu";
import { Resource } from "./resource";

export class APUResource {
  id: number;
  id_apu: APU;
  id_resource: Resource;
  created_at: Date;

  constructor(
    id_apu: APU = new APU(),
    id_resource: Resource = new Resource(),
    created_at: Date = new Date()
  ) {
    this.id_apu = id_apu;
    this.id_resource = id_resource;
    this.created_at = created_at;
  } 
}
