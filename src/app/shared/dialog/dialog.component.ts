import { NgIf } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  imports: [MatDialogModule, MatDividerModule, NgIf, MatButtonModule],
  standalone: true
})
export class DialogComponent implements OnInit {

  confirm: boolean;
  message: string;
  title: string;

  ngOnInit() {
    this.message = this.data.message;
    this.confirm = this.data.confirm;
    this.title = this.data.title;
  }

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
