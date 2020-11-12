import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MediaMatcher } from '@angular/cdk/layout';

import { TreeService, DataService, AuthenticationService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'sample-app';
  options: FormGroup;

  clusters: Array<any>;
  zones: Array<any>;

  matcher: MediaQueryList;
  sidenavMode = 'side';
  @ViewChild('sidenav', {static: true}) sidenav: { toggle: () => void; };

  constructor(fb: FormBuilder, public authenticationService: AuthenticationService, private toggleTree: TreeService, private dataService: DataService, private mediaMatcher: MediaMatcher) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 50
    });

  }

  ngOnInit() {
    // Sidenav behaviour(over/side) based on screen type
    this.matcher = this.mediaMatcher.matchMedia('(min-width: 800px)');
    this.matcher.addListener((state) => {
      if (state.matches) {
        this.sidenavMode = 'side';
      } else {
        this.sidenavMode = 'over';
      }
    });

    this.clusters = this.dataService.getUnassignedClusters();
    this.zones = this.dataService.getZonedClusters();

    this.toggleTree.message$.subscribe( value => {
      if (this.sidenav) {
        this.sidenav.toggle();
      }
    });
  }

  ngOnDestroy() {
    // destroy
  }

}
