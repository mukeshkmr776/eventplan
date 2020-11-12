import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

import { ApiService, AuthenticationService } from '../../shared/services';
import { AddEventComponent } from '../../shared/components/modals/AddEventComponent';
import { Animations } from '../../shared/animations/router';
import { Category, VIEWSECTION } from 'src/app/shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  animations: Animations
})
export class DashboardComponent implements OnInit {

  allEvents = {
    liveEvents: [],
    sectionEvents: []
  };

  isGathering = {
    LiveEvents: true,
    SectionEvents: true
  };

  greetings = '';

  viewSection = VIEWSECTION;
  currentViewSection = VIEWSECTION.RECENTLYADDED;

  constructor(private apiService: ApiService, public dialog: MatDialog, public authenticationService: AuthenticationService) {
    const hrs = new Date().getHours();
    if (hrs < 12) {
        this.greetings = 'Good Morning!';
    } else if (hrs >= 12 && hrs <= 17) {
      this.greetings = 'Good afternoon!';
    } else if (hrs >= 17 && hrs <= 24) {
        this.greetings = 'Good Evening!';
    }
  }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.getLiveEvents();
    this.getSectionEvents();
  }

  getLiveEvents() {
    this.isGathering.LiveEvents = true;
    const queryParams = new HttpParams().set('category', Category.LIVE.toLowerCase()).set('limit', '4');
    this.apiService.getAllEvents(queryParams)
      .then((events: any) => {
        this.allEvents.liveEvents = events;
        this.isGathering.LiveEvents = false;
      })
      .catch(err => {
        console.log(err);
        this.allEvents.liveEvents = [];
        this.isGathering.LiveEvents = false;
      });
  }

  getSectionEvents() {
    let queryParams;
    switch (this.currentViewSection) {
      case this.viewSection.RECENTLYADDED  :  queryParams = new HttpParams().set('category', Category.RECENTLYADDED.toLowerCase()).set('limit', '4'); break;
      case this.viewSection.STARTINGSOON   :  queryParams = new HttpParams().set('category', Category.STARTINGSOON.toLowerCase()).set('limit', '4');  break;
      case this.viewSection.EXPIRED        :  queryParams = new HttpParams().set('category', Category.EXPIRED.toLowerCase()).set('limit', '4');       break;
      default: return;
    }

    this.isGathering.SectionEvents = true;
    this.apiService.getAllEvents(queryParams)
    .then((events: any) => {
      this.allEvents.sectionEvents = events;
      this.isGathering.SectionEvents = false;
    })
    .catch(err => {
      console.log(err);
      this.allEvents.sectionEvents = [];
      this.isGathering.SectionEvents = false;
    });
  }

  changeViewSection(view: VIEWSECTION) {
    this.currentViewSection = view;
    this.getSectionEvents();
  }

  addAddEventDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '400px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.apiService.saveEvent(result)
        .then((response) => {
          console.log('Saved - ', response);
          this.getAllEvents();
        })
        .catch((error) => {
          console.log('Error in saving - ', error);
        });
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
