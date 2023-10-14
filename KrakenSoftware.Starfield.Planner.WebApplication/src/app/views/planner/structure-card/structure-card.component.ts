import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { OutpostStructure } from 'src/app/models/v1/outpost-structure';
import {Structure} from "../../../models/v1/structure";
import {Observable} from "rxjs";

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

  public currentStructureName?: string = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.data.structure) {
      this.currentStructureName = this.data.structure.name
    }
  }

  deleteStructure(): void {
    this.deleted.emit(this.data);
  }

  confirmStructure(): void {
    console.log(this.data);
    this.confirmed.emit(this.data);
  }

  updateStructure(): void {
    this.structureOptions$.subscribe(x => {
      for(let s of x) {
        if (s.name === this.currentStructureName) {
          console.log(this.data);
          this.data.structure = s;
          console.log(this.data);
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
    let demandQueued = this.data.structure.powerDemand * this.data.amount_desired;
    return `${demandBuild + demandQueued}`;
  }

  public calculateChange(): string {
    if (!this.data.structure || !this.data.amount_desired) return '';

    let isPowerBuildng = !this.data.structure.powerDemand;
    if (isPowerBuildng && this.data.structure.powerProductionMin && this.data.structure.powerProductionMax) {
      let minProductionQueued = this.data.structure.powerProductionMin * this.data.amount_desired;
      let maxProductionQueued = this.data.structure.powerProductionMax * this.data.amount_desired;
      return `${minProductionQueued}~${maxProductionQueued}`;
    }

    if (!this.data.structure.powerDemand) return '';
    let demandQueued = this.data.structure.powerDemand * this.data.amount_desired;
    return `${demandQueued}`;
  }
}
