import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  public showMessage(text: string, panelClass: string) {
    this.snackbar.open(text, undefined, {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2500,
        panelClass: panelClass,
      });
  }

}
