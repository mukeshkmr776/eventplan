import { AfterViewInit, Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Animations } from 'src/app/shared/animations/router';
import { FuseSplashScreenService } from 'src/app/shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: Animations
})
export class AppComponent implements AfterViewInit {
  loading: boolean;
  currentUrl: string;

  // Do not remove "FuseSplashScreenService" from here. Else, animation on first initial page won't work!
  constructor(private router: Router, private fuseSplashScreenService: FuseSplashScreenService) {
    this.loading = true;
  }


  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.currentUrl = event.url;
        setTimeout(() => { // for illusion to show loading when route change
          this.loading = false;
        }, 1000);
      }
    });
  }

}
