import { Component, OnInit } from '@angular/core';
import { TreeService } from '../../services/tree.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  headerOptions: Array<object> = [
    { name: 'Home', url: '/home' },
    { name: 'ClusterView', url: '/home/cluster/5' },
    { name: 'NodeView', url: '/home/cluster/5/node/r1r2' }
  ];

  active = true;

  constructor(private treeService: TreeService) { }

  ngOnInit() { }

  toggleTree() {
    this.treeService.toggleTree();
  }

  openAbout() {
    // this.aboutService.openAbout();
  }

  openFAQ() {
    // this.aboutService.openFAQ();
  }

}
