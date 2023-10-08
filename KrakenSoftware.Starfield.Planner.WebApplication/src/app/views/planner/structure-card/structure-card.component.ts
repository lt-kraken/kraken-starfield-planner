import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-structure-card',
  templateUrl: './structure-card.component.html',
  styleUrls: ['./structure-card.component.scss']
})
export class StructureCardComponent {

  @Input({ required: false}) class!: string;
}
