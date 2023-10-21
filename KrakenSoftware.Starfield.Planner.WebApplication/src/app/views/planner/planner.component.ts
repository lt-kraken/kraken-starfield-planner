import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PersistenceService} from 'src/app/services/persistence.service';
import {faAtom, faMicrochip} from '@fortawesome/free-solid-svg-icons';
import {ApplicationData} from "../../models/v1/application-data";
import {Outpost} from "../../models/v1/outpost";
import {OutpostStructure} from 'src/app/models/v1/outpost-structure';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {ModifyOutpostDialogComponent} from '../modify-outpost-dialog/modify-outpost-dialog.component';
import {ApiClientService} from "../../services/api-client.service";
import {Structure} from "../../models/v1/structure";
import {Observable, Subject} from "rxjs";

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

  data!: ApplicationData;
  activeOutpost?: Outpost = undefined;
  groupedOutpostStructures: { [category: string]: OutpostStructure[] } = {};
  structures!: Observable<Structure[]>;

  updateQueueSubject: Subject<void> = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private persistenceService: PersistenceService,
    private _snackBar: SnackbarService,
    private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.data = this.persistenceService.getApplicationData();
    this.setInitialSelection();
    this.updateOutpostStructureGroups();

    this.structures = this.apiClient.getStructures();
  }

  setInitialSelection(): void {
    if (this.data.outposts.length > 0) {
      this.setActiveOutpost(this.data.outposts[0]);
    }
    else {
      this.setActiveOutpost(undefined);
    }
  }

  //#region OUTPOST OPERATIONS
  deleteOutpost(outpost: Outpost): void {
    let index = this.data.outposts.indexOf(outpost);
    if (index === -1) {
      this._snackBar.showMessage(`Outpost ${outpost.name} could not be deleted.`, 'red');
      return;
    }

    this.persistenceService.persistableAction(this, this.data, function(self: PlannerComponent, data: ApplicationData) {
      self.data.outposts.splice(index, 1);
      if (self.activeOutpost === outpost) {
        self.setInitialSelection();
      }

      self._snackBar.showMessage(`Outpost ${outpost.name} has been deleted.`, 'green');
    });
  }

  modifyOutpost(outpost: Outpost, modification: Outpost): void {

    this.persistenceService.persistableAction(this, this.data, function(self: PlannerComponent, data: ApplicationData) {
      outpost.name = modification.name;
      outpost.system = modification.system;
      outpost.planet = modification.planet;
      outpost.moon = modification.moon;
    });

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
        this.persistenceService.persistableAction(this, this.data, function(self: PlannerComponent, data: ApplicationData) {
          data.outposts.push(result);
          self.setActiveOutpost(data.outposts[data.outposts.length-1]);
        });
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
  //#endregion

  //#region STRUCTURE OPERATIONS
  getStructureCategories(): string[] {
    return Object.keys(this.groupedOutpostStructures);
  }

  updateOutpostStructureGroups(): void {
    if (!this.activeOutpost) return;

    this.groupedOutpostStructures = this.activeOutpost.structures.reduce((acc, curr) => {
      const category = curr.structure?.category || 'Other';
      acc[category] = [...(acc[category] || []), curr];
      return acc;
    }, {} as { [category: string]: OutpostStructure[] });
  }

  addUnsavedStructure(): void {
    if (!this.activeOutpost) {
      this._snackBar.showMessage('Unable to add structure because no outpost is selected', 'red');
      return;
    }

    this.persistenceService.persistableAction(this, this.data, function(self: PlannerComponent, data: ApplicationData) {
      self.activeOutpost!.unsaved_structures.push(new OutpostStructure());
    });
  }

  addStructureToActiveOutpost(structure: OutpostStructure): void {
    if (!this.activeOutpost) {
      this._snackBar.showMessage('Unable to add structure because no outpost is selected', 'red');
      return;
    }

    this.persistenceService.persistableAction(this, this.data, function(self: PlannerComponent, data: ApplicationData) {
      let index = self.activeOutpost!.unsaved_structures.indexOf(structure);
      structure.dirty = true;
      self.activeOutpost!.unsaved_structures.splice(index, 1);
      self.activeOutpost!.structures.push(structure);

      self.updateOutpostStructureGroups();
    });

    this.updateQueueSubject.next();
  }

  removeStructureFromActiveOutpost(structure: OutpostStructure): void {
    if (!this.activeOutpost) {
      this._snackBar.showMessage('Unable to delete structure because no outpost is selected', 'red');
      return;
    }

    this.persistenceService.persistableAction(this, this.data, function(self: PlannerComponent, data: ApplicationData) {
      let unused_index = self.activeOutpost!.unsaved_structures.indexOf(structure);
      if (unused_index !== -1) {
        self.activeOutpost!.unsaved_structures.splice(unused_index, 1);
        self.updateOutpostStructureGroups();
        return;
      }

      let index = self.activeOutpost!.structures.indexOf(structure);
      if (index !== -1) {
        self.activeOutpost!.structures.splice(unused_index, 1);
        self.updateOutpostStructureGroups();
        return;
      }

      self._snackBar.showMessage(`Structure ${structure.structure?.name} could not be found for outpost ${self.activeOutpost!.name}`, 'red');
    });

    this.updateQueueSubject.next();
  }

  saveStructureUpdate(updateQueue: boolean) {
    this.persistenceService.persistableAction(this, this.data, function(self: PlannerComponent, data: ApplicationData) { });
    if (updateQueue) this.updateQueueSubject.next();
  }
  //#endregion

}
