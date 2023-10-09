import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {Outpost} from "../../models/v1/outpost";

@Component({
  selector: 'app-delete-outpost-dialog',
  templateUrl: './delete-outpost-dialog.component.html',
  styleUrls: ['./delete-outpost-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
})
export class DeleteOutpostDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<DeleteOutpostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Outpost,
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

