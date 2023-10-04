import { OutpostStructure } from "./OutpostStructure";

export interface Outpost {
    Id: number;
    Name: string;
    System: string;
    Planet: string;
    Moon?: string;
    OutpostStructures?: OutpostStructure[];
}