/**
 * ErrorDialogService
 * Service that take cares of opening error dialogs on the app.
 * @author canberkardic <ardiccanberk@gmail.com>
 */


import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private dialog: MatDialog) { }

  openErrorDialog(message?: string, size?: string) {
    let dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: size ? size : "350px",
      data: {
        message: message,
      }
    });
    return dialogRef;
  }
}
