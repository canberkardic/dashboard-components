import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
  imports: [MatDialogModule, MatIconModule, MatDividerModule],
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
