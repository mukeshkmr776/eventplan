import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TreeService {

  message$ = new Subject();

  constructor() { }

  sendMessage(notification?: Notification) {
    this.message$.next(notification);
  }

  toggleTree() {
    this.message$.next();
  }

}
