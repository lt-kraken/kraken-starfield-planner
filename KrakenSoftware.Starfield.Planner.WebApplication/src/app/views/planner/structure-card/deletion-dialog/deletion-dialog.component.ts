import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Outpost} from "../../../../models/v1/outpost";

@Component({
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrls: ['./deletion-dialog.component.scss']
})
export class DeletionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Outpost,
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
