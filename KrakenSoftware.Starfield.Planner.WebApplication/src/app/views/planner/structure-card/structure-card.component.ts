import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { OutpostStructure } from 'src/app/models/v1/outpost-structure';
import {Structure} from "../../../models/v1/structure";
import {Observable} from "rxjs";
import {DeleteOutpostDialogComponent} from "../../delete-outpost-dialog/delete-outpost-dialog.component";
import {Outpost} from "../../../models/v1/outpost";
import {MatDialog} from "@angular/material/dialog";
import {DeletionDialogComponent} from "./deletion-dialog/deletion-dialog.component";

@Component({
  selector: 'app-structure-card',
  templateUrl: './structure-card.component.html',
  styleUrls: ['./structure-card.component.scss']
})
export class StructureCardComponent implements OnInit {

  @Input() class?: any;
  @Input() includeConfirm: boolean = false;
  @Input() data!: OutpostStructure;
  @Input() structureOptions$!: Observable<Structure[]>;
  @Input() enableDropdown: boolean = false;

  @Output() confirmed = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() updated = new EventEmitter();

  public currentStructureName?: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.data.structure) {
      this.currentStructureName = this.data.structure.name
    }
  }

  deleteStructure(): void {
    const dialogRef = this.dialog.open(DeletionDialogComponent, { data: this.data });

    dialogRef.afterClosed().subscribe((result: OutpostStructure) => {
      if (result) {
        this.deleted.emit(result);
      }
    });
  }

  confirmStructure(): void {
    this.confirmed.emit(this.data);
  }

  sendUpdatedEvent(event: Event) {
    this.data.dirty = this.data.amount_build !== this.data.amount_desired;
    this.data.checked = false;
    this.updated.emit(event);
  }

  updateStructure(): void {
    this.structureOptions$.subscribe(x => {
      for(let s of x) {
        if (s.name === this.currentStructureName) {
          this.data.structure = s;
        }
      }
    });
  }

  formatPowerDemandOrProduction(): string {
    if (!this.data.structure) return '?';

    let isPowerBuilding = !this.data.structure.powerDemand;
    if (isPowerBuilding && this.data.structure.powerProductionMin && this.data.structure.powerProductionMax) {
      let minProductionBuild = this.data.structure.powerProductionMin * this.data.amount_build;
      let maxProductionBuild = this.data.structure.powerProductionMax * this.data.amount_build;
      return `${minProductionBuild}~${maxProductionBuild}`;
    }

    if (!this.data.structure.powerDemand) return '?';
    let demandBuild = this.data.structure.powerDemand * this.data.amount_build;
    return `${demandBuild}`;
  }

  public calculateChange(): string {
    return Math.abs(this.data.amount_build-this.data.amount_desired).toString();
  }

  public calculatePowerChange(): string {
    if (!this.data.structure) return '';

    let isPowerBuildng = !this.data.structure.powerDemand;
    if (isPowerBuildng && this.data.structure.powerProductionMin && this.data.structure.powerProductionMax) {
      let minProductionQueued = this.data.structure.powerProductionMin * parseInt(this.calculateChange(), 10);
      let maxProductionQueued = this.data.structure.powerProductionMax * parseInt(this.calculateChange(), 10);
      return `${minProductionQueued}~${maxProductionQueued}`;
    }

    if (!this.data.structure.powerDemand) return '';
    let demandQueued = this.data.structure.powerDemand * parseInt(this.calculateChange(), 10);
    return `${demandQueued}`;
  }

  determineLabelClass(): string {
    if (!this.data.structure) {
      console.error('Invalid state detected');
      return '';
    }

    if (this.data.structure.powerDemand) return 'red-label';
    return 'green-label';
  }
}
