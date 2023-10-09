import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {Outpost} from "../../models/v1/outpost";
// import { Outpost } from 'src/app/models/Outpost';

@Component({
  selector: 'app-modify-outpost-dialog',
  templateUrl: './modify-outpost-dialog.component.html',
  styleUrls: ['./modify-outpost-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
})
export class ModifyOutpostDialogComponent {

  outpostFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  systemFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  planetFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  moonFormControl = new FormControl('', [Validators.minLength(0), Validators.maxLength(25)]);

  constructor(
    public dialogRef: MatDialogRef<ModifyOutpostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Outpost,
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isFormValid(): boolean {
    return this.outpostFormControl.valid && this.systemFormControl.valid && this.planetFormControl.valid;
  }
}
