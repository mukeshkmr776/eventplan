import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-event-dialog',
  template: `
            <div mat-dialog-content>
              <mat-form-field class="example-full-width">
                <mat-label>Name</mat-label>
                <input matInput placeholder="Name" [(ngModel)]="Event.name">
              </mat-form-field>
              <mat-form-field class="example-full-width">
                <mat-label>Description</mat-label>
                <input matInput placeholder="Description" [(ngModel)]="Event.description">
              </mat-form-field>
              <mat-form-field class="example-full-width">
                <mat-label>Subtitle</mat-label>
                <input matInput placeholder="Subtitle" [(ngModel)]="Event.subtitle">
              </mat-form-field>
              <mat-form-field class="example-full-width">
                <mat-label>Data</mat-label>
                <input matInput placeholder="Data" [(ngModel)]="Event.data">
              </mat-form-field>
            </div>
            <div mat-dialog-actions class="d-flex justify-content-end">
              <button mat-button class="btn-primary" (click)="onSubmit()">Submit</button>
              <button mat-stroked-button [mat-dialog-close]>Cancel</button>
            </div>
            `,
  styles: [
    `
      .example-full-width {
        width: 100%;
      }
    `
  ]
})
export class AddEventComponent {

  Event = {
    name: '',
    description: '',
    subtitle: '',
    data: '',
    configuration: {},
  };

  constructor(public dialogRef: MatDialogRef <AddEventComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onSubmit() {
    this.dialogRef.close(this.Event);
  }

}
