import {Resource} from "./resource";

export class Structure {
  name?: string;
  powerDemand?: number;
  powerProductionMin?: number;
  powerProductionMax?: number;
  build_cost: Resource[] = [];
  //operating_cost: Resource[] = [];
  category?: string;
}
