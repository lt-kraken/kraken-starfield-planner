import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { PersistenceService } from 'src/app/services/persistence.service';
import { faAtom, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import {ApplicationData} from "../../models/v1/application-data";
import {Outpost} from "../../models/v1/outpost";
import { OutpostStructure } from 'src/app/models/v1/outpost-structure';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ModifyOutpostDialogComponent } from '../modify-outpost-dialog/modify-outpost-dialog.component';

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

  faAtom = faAtom;
  faMicrochip = faMicrochip;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  data!: ApplicationData;
  activeOutpost?: Outpost = undefined;

  constructor(
    public dialog: MatDialog, 
    private persistenceService: PersistenceService, 
    private _snackBar: SnackbarService) {}

  ngOnInit(): void {
    this.data = this.persistenceService.getApplicationData();
    console.log(this.data);

    this.setInitialSelection();
  }

  setInitialSelection(): void {
    if (this.data.outposts.length > 0) {
      this.setActiveOutpost(this.data.outposts[0]);
    }
    else {
      this.setActiveOutpost(undefined);
    }
  }

  deleteQueuedOutpost(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    console.log("clicked");
  }

  deleteOutpost(outpost: Outpost): void {
    let index = this.data.outposts.indexOf(outpost);
    if (index === -1) {
      this._snackBar.showMessage(`Outpost ${outpost.name} could not be deleted.`, 'red');
      return;
    }

    this.data.outposts.splice(index, 1);
    if (this.activeOutpost === outpost) {
      this.setInitialSelection();
    }

    this._snackBar.showMessage(`Outpost ${outpost.name} has been deleted.`, 'green');
  }

  modifyOutpost(outpost: Outpost, modification: Outpost): void {
    outpost.name = modification.name;
    outpost.system = modification.system;
    outpost.planet = modification.planet;
    outpost.moon = modification.moon;

    this._snackBar.showMessage(`Outpost ${modification.name} has been modified.`, 'green');
  }

  createOutpost(): void {
    let dialogData: Outpost = { 
      name: '',
      system: '',
      planet: '',
      moon: '',
      structures: [],
      unsaved_structures: []
     };

    const dialogRef = this.dialog.open(ModifyOutpostDialogComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe((result: Outpost) => {
      if (result) {
        this.data.outposts.push(result);
        this.setActiveOutpost(this.data.outposts[this.data.outposts.length-1]);
      }
    });
  }

  setActiveOutpost(outpost?: Outpost): void {
    this.activeOutpost = outpost;
  }

  isActiveOutpost(outpost: Outpost): boolean {
    let result = this.activeOutpost == outpost;
    return result;
  }

  addStructureToActiveOutpost(structure: OutpostStructure): void {
    console.log(structure);
  }

  removeStructureFromActiveOutpost(structure: OutpostStructure): void {
    console.log(structure);
  }









  // updateAmount(structure: OutpostStructure, event: any) {
  //   structure.DesiredBuild = event.amount;
  //   if (event.amount < structure.CurrentlyBuild) {
  //     structure.CurrentlyBuild = event.amount;
  //   }
  //   this.updateBuildQueue();
  // }
  //
  // createOutpost(): void {
  //   const data: Outpost = {
  //     Id: 0,
  //     Name: '',
  //     System: '',
  //     Planet: '',
  //     Moon: ''
  //   };
  //
  //   const dialogRef = this.dialog.open(CreateOutpostComponent, { data });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (!result) return;
  //     this.outposts.push(result);
  //     if (this.outposts.length == 1) this.setActiveOutpost(this.outposts[0]);
  //   });
  // }
  //
  // editOutpost(outpost: Outpost): void {
  //   let index = this.outposts.indexOf(outpost);
  //
  //   const data: Outpost = {
  //     Id: outpost.Id,
  //     Name: outpost.Name,
  //     System: outpost.System,
  //     Planet: outpost.Planet,
  //     Moon: outpost.Moon
  //   };
  //
  //   const dialogRef = this.dialog.open(CreateOutpostComponent, { data });
  //
  //   dialogRef.afterClosed().subscribe((result: Outpost) => {
  //     if (!result) return;
  //     this.outposts[index].Name = result.Name;
  //     this.outposts[index].System = result.System;
  //     this.outposts[index].Planet = result.Planet;
  //     this.outposts[index].Moon = result.Moon;
  //   });
  // }
  //
  // deleteOutpost(outpost: Outpost): void {
  //   let index = this.outposts.indexOf(outpost, 0);
  //
  //   const data: Outpost = {
  //     Id: outpost.Id,
  //     Name: outpost.Name,
  //     System: outpost.System,
  //     Planet: outpost.Planet,
  //     Moon: outpost.Moon
  //   };
  //
  //   const dialogRef = this.dialog.open(DeleteOutpostDialogComponent, { data });
  //
  //   dialogRef.afterClosed().subscribe((result: Outpost) => {
  //     if (result) {
  //       if (index > -1) this.outposts.splice(index, 1);
  //       this.setActiveOutpost(this.outposts[0]);
  //       this.updateBuildQueue();
  //     }
  //   });
  // }
  //

  //

  //
  // addBlueprintStructure(): void {
  //   if (!this.activeOutpost) return;
  //   if (!this.activeOutpost.OutpostStructures) this.activeOutpost.OutpostStructures = [];
  //
  //   let item = {
  //     Structure: {
  //       Id: -1,
  //       Name: ''
  //     },
  //     CurrentlyBuild: 0,
  //     DesiredBuild: 1,
  //   };
  //
  //   this.activeOutpost?.OutpostStructures?.push(item);
  //   this.updateBuildQueue();
  // }
  //
  // updateBuildQueue(): void {
  //   let queue: BuildQueueItem[] = [];
  //
  //   for(let outpost of this.outposts) {
  //     if (!outpost.OutpostStructures) continue;
  //
  //     for(let structure of outpost.OutpostStructures) {
  //       if (structure.CurrentlyBuild < structure.DesiredBuild) {
  //         queue.push({
  //           OutpostName: outpost.Name,
  //           Structure: structure
  //         });
  //       }
  //     }
  //   }
  //
  //   this.buildQueue = queue;
  // }
  //
  // isBuild(outpost: BuildQueueItem): boolean {
  //   return outpost.Structure.CurrentlyBuild === outpost.Structure.DesiredBuild;
  // }
  //
  // markComplete(outpost: BuildQueueItem): void {
  //   outpost.Structure.CurrentlyBuild = outpost.Structure.DesiredBuild;
  // }
  //
  // amountBuildQueueNotYetCompleted(groupedOutpost: any): number {
  //   let rows = groupedOutpost.value;
  //   let amountNotCompleted = 0;
  //   for (let structure of rows) {
  //     if (structure.Structure.CurrentlyBuild < structure.Structure.DesiredBuild) {
  //       amountNotCompleted++;
  //     }
  //   }
  //
  //   return amountNotCompleted;
  // }
  //
  // buildQueueSomeCompleted(groupedOutpost: any): boolean {
  //   let amountNotCompleted = this.amountBuildQueueNotYetCompleted(groupedOutpost);
  //   return amountNotCompleted !== groupedOutpost.value.length && amountNotCompleted !== 0;
  // }
  //
  // markAllCompleted(groupedOutpost: any): void {
  //   for (let structure of groupedOutpost.value) {
  //     structure.Structure.CurrentlyBuild = structure.Structure.DesiredBuild;
  //   }
  // }

}
