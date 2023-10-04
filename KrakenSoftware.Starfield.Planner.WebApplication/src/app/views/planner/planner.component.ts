import { Component, OnInit } from '@angular/core';
import { CreateOutpostComponent } from '../create-outpost/create-outpost.component';
import {MatDialog} from '@angular/material/dialog';
import { DeleteOutpostDialogComponent } from '../delete-outpost-dialog/delete-outpost-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { BuildQueueItem } from 'src/app/models/BuildQueueItem';
import { Outpost } from 'src/app/models/Outpost';
import { OutpostStructure } from 'src/app/models/OutpostStructure';
import { PersistenceService } from 'src/app/services/persistence.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlannerComponent implements OnInit {


  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  outpostsLoaded: boolean = false;
  outposts: Outpost[] = [];
  activeOutpost?: Outpost = undefined;

  automaticSaveIndicatorVisible: boolean = false;
  manualSaveIndicatorVisible: boolean = false;
  saveIndicatorInterval: any;
  saveIndicatorSecondsLeft: number = 0;

  buildQueue: BuildQueueItem[] = [];

  constructor(public dialog: MatDialog, private persistenceService: PersistenceService) {}

  ngOnInit(): void {
    this.outposts = this.persistenceService.getOutposts();
    this.outpostsLoaded = true;
    if (this.outposts.length > 0) {
      this.setActiveOutpost(this.outposts[0]);
    }

    let self = this;
    setInterval(function() { 
        self.saveIndicatorSecondsLeft = --self.saveIndicatorSecondsLeft;
    }, 1000);

    this.initiateAutoSave();  
  }

  initiateAutoSave(): void {
    let self = this;

    self.saveIndicatorSecondsLeft = 30;
    setInterval(function() {
      self.performAutomaticPersist(true);
      self.saveIndicatorSecondsLeft = 30;
    }, 30000);

  }

  performAutomaticPersist(automatic: boolean): void {
    this.persistenceService.persistOutposts(this.outposts);
    this.automaticSaveIndicatorVisible = automatic;
    this.manualSaveIndicatorVisible = !automatic;

    if (!automatic) clearInterval(this.saveIndicatorInterval);

    let self = this;
    this.saveIndicatorInterval = setTimeout(function() {
      self.automaticSaveIndicatorVisible = false;
      self.manualSaveIndicatorVisible = false;
    }, 5000);
  }

  getAutosaveTooltip(): string {
    return `Auto save in approx. ${this.saveIndicatorSecondsLeft} seconds.`
  }

  updateAmount(structure: OutpostStructure, event: any) {
    structure.DesiredBuild = event.amount;
    if (event.amount < structure.CurrentlyBuild) {
      structure.CurrentlyBuild = event.amount;
    }
    this.updateBuildQueue();
  }

  createOutpost(): void {
    const data: Outpost = {
      Id: 0,
      Name: '',
      System: '',
      Planet: '',
      Moon: ''
    };

    const dialogRef = this.dialog.open(CreateOutpostComponent, { data });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.outposts.push(result);
      if (this.outposts.length == 1) this.setActiveOutpost(this.outposts[0]);
    });
  }

  editOutpost(outpost: Outpost): void {
    let index = this.outposts.indexOf(outpost);

    const data: Outpost = {
      Id: outpost.Id,
      Name: outpost.Name,
      System: outpost.System,
      Planet: outpost.Planet,
      Moon: outpost.Moon
    };

    const dialogRef = this.dialog.open(CreateOutpostComponent, { data });

    dialogRef.afterClosed().subscribe((result: Outpost) => {
      if (!result) return;
      this.outposts[index] = result;
      this.setActiveOutpost(this.outposts[index]);
    });
  }

  deleteOutpost(outpost: Outpost): void {
    let index = this.outposts.indexOf(outpost, 0);

    const data: Outpost = {
      Id: outpost.Id,
      Name: outpost.Name,
      System: outpost.System,
      Planet: outpost.Planet,
      Moon: outpost.Moon
    };

    const dialogRef = this.dialog.open(DeleteOutpostDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result: Outpost) => {
      if (result) {
        if (index > -1) this.outposts.splice(index, 1);
        this.setActiveOutpost(this.outposts[0]);
      }
    });
  }

  isActiveOutpost(outpost: Outpost): boolean {
    let result = this.activeOutpost == outpost;
    return result;
  }

  setActiveOutpost(outpost: Outpost): void {
    this.activeOutpost = outpost;
  }

  addBlueprintStructure(): void {
    if (!this.activeOutpost) return;
    if (!this.activeOutpost.OutpostStructures) this.activeOutpost.OutpostStructures = [];
    
    let item = {
      Structure: {
        Id: -1,
        Name: ''
      },
      CurrentlyBuild: 0,
      DesiredBuild: 1,
    };
    
    this.activeOutpost?.OutpostStructures?.push(item);
    this.updateBuildQueue();
  }

  updateBuildQueue(): void {
    let queue: BuildQueueItem[] = [];

    for(let outpost of this.outposts) {
      if (!outpost.OutpostStructures) continue;

      for(let structure of outpost.OutpostStructures) {
        if (structure.CurrentlyBuild < structure.DesiredBuild) {
          queue.push({
            OutpostName: outpost.Name,
            Structure: structure
          });
        }
      }
    }

    this.buildQueue = queue;
  }

  isBuild(outpost: BuildQueueItem): boolean {
    return outpost.Structure.CurrentlyBuild === outpost.Structure.DesiredBuild;
  }

  markComplete(outpost: BuildQueueItem): void {
    outpost.Structure.CurrentlyBuild = outpost.Structure.DesiredBuild;
  }

  amountBuildQueueNotYetCompleted(groupedOutpost: any): number {
    let rows = groupedOutpost.value;
    let amountNotCompleted = 0;
    for (let structure of rows) {
      if (structure.Structure.CurrentlyBuild < structure.Structure.DesiredBuild) {
        amountNotCompleted++;
      }
    }

    return amountNotCompleted;
  }

  buildQueueSomeCompleted(groupedOutpost: any): boolean {
    let amountNotCompleted = this.amountBuildQueueNotYetCompleted(groupedOutpost);
    return amountNotCompleted !== groupedOutpost.value.length && amountNotCompleted !== 0;
  }

  markAllCompleted(groupedOutpost: any): void {
    for (let structure of groupedOutpost.value) {
      structure.Structure.CurrentlyBuild = structure.Structure.DesiredBuild;
    }
  }

}
