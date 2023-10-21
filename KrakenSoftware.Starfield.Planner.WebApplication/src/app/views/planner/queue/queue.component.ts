import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {faAtom, faMicrochip} from '@fortawesome/free-solid-svg-icons';
import {ApplicationData} from "../../../models/v1/application-data";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Observable, Subscription} from "rxjs";
import {Outpost} from "../../../models/v1/outpost";
import {OutpostStructure} from "../../../models/v1/outpost-structure";

export class QueueResource {
  icon!: IconProp;
  name!: string;
  amount!: number;
  weightEach!: number;
}

export class QueueStructure {
  structure!: OutpostStructure;
  amount!: number;
  toDestroy!: boolean;
}

export class QueueOutpost {
  outpost!: Outpost;
  structures: Array<QueueStructure> = [];
}

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit, OnDestroy {

  faAtom = faAtom;
  faMicrochip = faMicrochip;

  @Input() public data: ApplicationData | undefined;

  private updateQueueSubscription: Subscription | undefined;
  @Input() public updateQueue!: Observable<void>;

  @Output() updated = new EventEmitter();

  requiredResources: QueueResource[] = [];
  queuedOutposts: Array<QueueOutpost> = [];

  ngOnInit(): void {
    this.updateQueueSubscription = this.updateQueue.subscribe(() => {
      this.updateResources()
      this.updateOutposts();
    });

    this.updateResources();
    this.updateOutposts();
  }

  ngOnDestroy(): void {
    this.updateQueueSubscription?.unsubscribe();
  }

  updateResources(): void {
    if (!this.data) return;
    this.requiredResources = [];

    for(let outpost of this.data.outposts) {
      for (let structure of outpost.structures) {
        if (!structure.dirty || !structure.structure) continue;

        for (let resource of structure.structure.build_cost) {
          let existingResource = this.requiredResources.find((res: QueueResource) => res.name === resource.name);
          if (existingResource) existingResource.amount += resource.amount * (structure.amount_desired - structure.amount_build);
          else {
            this.requiredResources.push({
              name: resource.name,
              icon: faAtom,
              weightEach: resource.weight,
              amount: resource.amount * (structure.amount_desired - structure.amount_build)
            });
          }
        }
      }
    }
  }

  updateOutposts(): void {
    if (!this.data) return;
    this.queuedOutposts = [];

    for (let outpost of this.data.outposts) {
      for (let structure of outpost.structures) {
        if (!structure.dirty || !structure.structure) continue;

        let existingOutpost = this.queuedOutposts.find((x: QueueOutpost) => outpost === x.outpost);

        // Add new outpost entry
        if (!existingOutpost) {
          existingOutpost = {
            outpost: outpost,
            structures: []
          };

          this.queuedOutposts.push(existingOutpost);
        }

        // Add Structure
        existingOutpost.structures.push({
          structure: structure,
          toDestroy: structure.amount_desired < structure.amount_build,
          amount: Math.abs(structure.amount_build-structure.amount_desired)
        });

      }
    }
  }

  allJobsChecked(outpost: QueueOutpost): boolean {
    let result = true;

    for (let structure of outpost.structures) {
      if (!structure.structure.checked) {
        result = false;
        break;
      }
    }

    return result;
  }

  confirmQueuedOutpost(outpost: QueueOutpost, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    for (let structure of outpost.structures) {
      structure.structure.checked = false;
      structure.structure.dirty = false;
      structure.structure.amount_build = structure.structure.amount_desired;
    }

    let index = this.queuedOutposts.indexOf(outpost);
    this.queuedOutposts.splice(index, 1);

    this.updateResources();
    this.updateOutposts();

    this.updated.emit();
  }

  resetQueuedOutpost(outpost: QueueOutpost, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    for (let structure of outpost.structures) {
      structure.structure.checked = false;
      structure.structure.dirty = false;
      structure.structure.amount_desired = structure.structure.amount_build;
    }

    let index = this.queuedOutposts.indexOf(outpost);
    this.queuedOutposts.splice(index, 1);

    this.updateResources();
    this.updateOutposts();

    this.updated.emit();
  }

  checkboxChanged(): void {
    this.updated.emit();
  }

}
