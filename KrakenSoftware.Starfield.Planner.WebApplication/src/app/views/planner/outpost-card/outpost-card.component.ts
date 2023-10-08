import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-outpost-card',
  templateUrl: './outpost-card.component.html',
  styleUrls: ['./outpost-card.component.scss']
})
export class OutpostCardComponent {

  @Input({ required: false }) class!: string;

  constructor() {
    console.log(this);
  }
}
