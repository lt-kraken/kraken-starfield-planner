import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Outpost} from "../../../models/v1/outpost";
import { MatDialog } from '@angular/material/dialog';
import { DeleteOutpostDialogComponent } from '../../delete-outpost-dialog/delete-outpost-dialog.component';
import { ModifyOutpostDialogComponent } from '../../modify-outpost-dialog/modify-outpost-dialog.component';

@Component({
  selector: 'app-outpost-card',
  templateUrl: './outpost-card.component.html',
  styleUrls: ['./outpost-card.component.scss']
})
export class OutpostCardComponent {
  @Input() class?: any;
  @Input() data!: Outpost;

  @Output() deleted = new EventEmitter();
  @Output() modified = new EventEmitter();

  constructor(public dialog: MatDialog) {
    console.log(this);
  }

  editOutpost(outpost: Outpost, $event: Event) {    
    $event.stopPropagation();
    $event.preventDefault();

    let dialogData = { ...outpost };

    const dialogRef = this.dialog.open(ModifyOutpostDialogComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe((result: Outpost) => {
      if (result) {
        this.modified.emit(result);
      }
    });
  }

  deleteOutpost(outpost: Outpost, $event: Event) {    
    $event.stopPropagation();
    $event.preventDefault();

    const dialogRef = this.dialog.open(DeleteOutpostDialogComponent, { data: outpost });

    dialogRef.afterClosed().subscribe((result: Outpost) => {
      if (result) {
        this.deleted.emit(result);
      }
    });
  }
}
