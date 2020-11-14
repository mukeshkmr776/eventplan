import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models';

@Component({
  selector: 'app-filter-event-dialog',
  template: `
            <h1 mat-dialog-title class="text-center">Choose filters</h1>

            <div mat-dialog-content class="pb-4">
              <div class="test">Categories</div>

              <mat-radio-group class="d-flex flex-column pl-2" [(ngModel)]="data">
                <mat-radio-button *ngFor="let category of Categories" [value]="category" class="pt-2" (click)="onCategorySelect(category)">
                  {{category}}
                </mat-radio-button>
              </mat-radio-group>


              <!-- <div class="test">Sort by</div>
              <mat-button-toggle-group #sortGroup="matButtonToggleGroup">
                <mat-button-toggle value="oldestfirst" matTooltip="Oldest first"><mat-icon>filter_list</mat-icon></mat-button-toggle>
                <mat-button-toggle value="latestfirst" matTooltip="Latest first" class="rotate-180"><mat-icon class="">filter_list</mat-icon></mat-button-toggle>
              </mat-button-toggle-group> -->
            </div>

            <div mat-dialog-actions class="d-flex justify-content-end">
              <button mat-button class="btn-primary" (click)="onSubmit()">Submit</button>
              <button mat-stroked-button [mat-dialog-close]>Cancel</button>
            </div>
            `,
  styles: [
    `
    .test {
      padding: .5em 0;
      color: gray;
    }
    .test2 {
      /*  */
    }
    .test3 {
      height: 32px !important;
    }

    `
  ]
})
export class FilterEventComponent implements OnInit {

  Categories  = [ Category.LIVE, Category.EXPIRED, Category.RECENTLYADDED, Category.STARTINGSOON ];
  SortByDates = [ 'LATESTFIRST', 'OLDESTFIRST' ];

  selectedCategories = [];

  constructor(public dialogRef: MatDialogRef <FilterEventComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.Categories.forEach(item => {
      if (this.data.trim().toUpperCase() === item.trim().toUpperCase()) {
        this.data = item;
      }
    });

    this.selectedCategories = this.Categories.filter(category => {
      return this.data.trim().toUpperCase() === category.trim().toUpperCase() ? true : false;
    });

    console.log('data-"%s"', this.data);
  }

  onSubmit() {
    this.dialogRef.close(this.data);
  }

  onCategorySelect(value) {
    this.data = value;

    if (this.selectedCategories.indexOf(value) === -1) {
      this.selectedCategories.push(value);
    } else {
      this.selectedCategories.splice(this.selectedCategories.indexOf(value), 1);
    }
  }

}
