import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gathering-data',
  templateUrl: './gathering-data.component.html',
  styleUrls: ['./gathering-data.component.less']
})
export class GatheringDataComponent implements OnInit {

  @Input() mode = 'dark';
  @Input() showCancel ? = false;
  @Output() onCancel ? = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onCancelLoading() {
    if (this.showCancel) {
      this.onCancel.emit(null);
    }
  }

}
