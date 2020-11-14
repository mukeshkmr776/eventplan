import { Component } from '@angular/core';

@Component({
  selector: 'app-copyright',
  template:
      `
      <div class="d-flex justify-content-between align-items-center text-muted mat-small mt-3">
        <div>All rights reserved. Copyright © {{ today | date:'yyyy' }} :P</div>
      </div>
      `,
  styles: []
})
export class CopyrightComponent {

  today = Date.now();

  constructor() { }

}
