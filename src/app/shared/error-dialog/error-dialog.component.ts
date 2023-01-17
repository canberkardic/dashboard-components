import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'error-dialog-component',
  template: `
      <div mat-dialog-title>
        <mat-icon style="color: burlywood; vertical-align: middle;"> warning</mat-icon>
          <span style="vertical-align: middle;">
            Hata Mesajı
          </span>
        <mat-divider></mat-divider>
      </div>

      <div mat-dialog-content>
        <span style="white-space: pre-line">
          {{message}}
        </span>
      </div>

      <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Okay</button>
      </div>
  `,
  styles: [],
  imports: [MatDialogModule, MatIconModule, MatDividerModule,],
  standalone: true
})
export class ErrorDialogComponent implements OnInit {

  message: string;

  ngOnInit() {
    if (this.data.message) {
      this.message = this.data.message;
    } else {
      this.message = "Error Occured"
    }
  }

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
