import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class FuseSplashScreenService {
  splashScreenEl: any;
  player: AnimationPlayer;
  bodyTag: HTMLBodyElement;

  constructor(
    private animationBuilder: AnimationBuilder,
    @Inject(DOCUMENT) private document: any,
    private router: Router
  ) {
    // Initialize
    this.init();
  }
  flag = true;

  private init(): void {
    // Get the splash screen element
    this.bodyTag = document.getElementsByTagName('body')[0];
    this.splashScreenEl = this.document.body.querySelector('#app-loader');

    // If the splash screen element exists...
    if (this.splashScreenEl) {
      const hideOnLoad = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this.hide();
            hideOnLoad.unsubscribe();
          }, 1500);
        }
      });

    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show the splash screen
   */
  show(): void {
    this.player =
      this.animationBuilder
      .build([
        style({
          opacity: '0',
          zIndex: '99999'
        }),
        animate('400ms ease', style({
          opacity: '1'
        }))
      ]).create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  /**
   * Hide the splash screen
   */
  hide(): void {
    this.player =
      this.animationBuilder
      .build([
        style({
          opacity: '1'
        }),
        animate('400ms ease', style({
          opacity: '0',
          zIndex: '-10'
        }))
      ]).create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
      this.bodyTag.classList.remove('overflow');
    }, 0);
  }
}
