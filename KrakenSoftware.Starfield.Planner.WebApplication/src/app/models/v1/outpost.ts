import {OutpostStructure} from "./outpost-structure";

export class Outpost {
  name: string = '';
  system: string = '';
  planet: string = '';
  moon: string = '';
  structures: OutpostStructure[] = [];
  unsaved_structures: OutpostStructure[] = [];
}
