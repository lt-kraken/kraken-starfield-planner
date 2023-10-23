import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { OutpostStructure } from 'src/app/models/v1/outpost-structure';
import {Structure} from "../../../models/v1/structure";
import {debounceTime, distinctUntilChanged, map, Observable, ReplaySubject, Subject, switchMap, takeUntil} from "rxjs";
import {DeleteOutpostDialogComponent} from "../../delete-outpost-dialog/delete-outpost-dialog.component";
import {Outpost} from "../../../models/v1/outpost";
import {MatDialog} from "@angular/material/dialog";
import {DeletionDialogComponent} from "./deletion-dialog/deletion-dialog.component";
import {FormControl} from "@angular/forms";

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

  public structureCtrl: FormControl<Structure | null> = new FormControl<Structure | null>(null);
  public structureFilterCtrl: FormControl<string | null> = new FormControl<string | null>('');
  public filteredStructures: ReplaySubject<Structure[]> = new ReplaySubject<Structure[]>(1);
  protected _onDestroy = new Subject<void>();

  public currentStructureName?: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.data.structure) {
      this.currentStructureName = this.data.structure.name
    }

    this.structureOptions$.subscribe(x => {
      this.filteredStructures.next(x.slice());
    });

    this.structureFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  protected filterBanks() {
    this.structureFilterCtrl.valueChanges
      .pipe(
        debounceTime(300), // Add a debounce time to wait for user input to stabilize
        distinctUntilChanged(), // Ensure that the value has actually changed
        switchMap(search => {
          if (!search || !this.structureOptions$) {
            return this.structureOptions$ ? this.structureOptions$ : [];
          }
          search = search.toLowerCase();
          return this.structureOptions$.pipe(
            map(banks =>
              banks.filter(bank =>
                bank.name?.toLowerCase().includes(search ?? '')
              )
            )
          );
        })
      )
      .subscribe(filteredBanks => {
        this.filteredStructures.next(filteredBanks);
      });
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

  confirmEnabled(): boolean {
    return !this.data.structure;
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
