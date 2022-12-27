/**
 * DialogService
 * Service that take cares of opening dialogs on the app.
 * @author canberkardic <ardiccanberk@gmail.com>
 */

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  openSuccessDialog() {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        message: 'i18n-general-success-message',
        confirm: false
      }
    })
  }

  openFailureDialog() {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        message: 'i18n-general-fail_message',
        confirm: false
      }
    })
  }

  openCustomDialog(message: string, isConfirm: boolean, size?: string, title?: string,) {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: size ? size : "350px",
      data: {
        message: message,
        confirm: isConfirm,
        title: title
      }
    })
    return dialogRef;
  }



}
