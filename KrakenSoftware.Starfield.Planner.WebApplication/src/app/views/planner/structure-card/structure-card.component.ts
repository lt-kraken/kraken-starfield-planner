import {Component, EventEmitter, Input, Output} from '@angular/core';
import { OutpostStructure } from 'src/app/models/v1/outpost-structure';

@Component({
  selector: 'app-structure-card',
  templateUrl: './structure-card.component.html',
  styleUrls: ['./structure-card.component.scss']
})
export class StructureCardComponent {

  @Input() class?: any;
  @Input() includeConfirm: boolean = false;
  @Input() data!: OutpostStructure;
  @Output() confirmed = new EventEmitter();
  @Output() deleted = new EventEmitter();

  deleteStructure(): void {
    this.confirmed.emit(this.data);
  }

  confirmStructure(): void {
    this.deleted.emit(this.data);
  }
}
