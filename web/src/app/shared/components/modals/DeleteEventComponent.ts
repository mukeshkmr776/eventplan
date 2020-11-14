import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-event-dialog',
  template: `
            <h1 mat-dialog-title class="text-center">Are you sure you want to delete this?</h1>
            <div mat-dialog-actions class="justify-content-center">
              <br>
              <button mat-stroked-button (click)="onYes()">Yes</button>
              <button mat-raised-button class="btn-primary" [mat-dialog-close]>No</button>
            </div>
            `
})
export class DeleteEventComponent {

  constructor(public dialogRef: MatDialogRef <DeleteEventComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onYes() {
    this.dialogRef.close(this.data);
  }

}
