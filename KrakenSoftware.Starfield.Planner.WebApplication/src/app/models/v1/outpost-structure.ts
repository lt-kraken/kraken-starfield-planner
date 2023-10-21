import {Structure} from "./structure";

export class OutpostStructure {
  structure?: Structure;
  amount_build: number = 0;
  amount_desired: number = 0;
  dirty: boolean = false;
  checked: boolean = false;
}
