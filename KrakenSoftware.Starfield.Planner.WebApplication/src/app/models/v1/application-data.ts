import {Outpost} from "./outpost";
import {BuildQueue} from "./build-queue";

export class ApplicationData {
  version: string = 'v1';
  outposts: Outpost[] = [];
  queue: BuildQueue[] = [];
}
