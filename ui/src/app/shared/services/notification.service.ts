import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { merge } from 'lodash';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(text: string, undo?: string, options?: any) {
    options = merge(options, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end'
    });

    this.snackBar.open(text, undo || '', options);
  }

}
