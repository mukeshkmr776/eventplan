import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { FilterEventComponent, AddEventComponent, DeleteEventComponent } from 'src/app/shared/components';
import { ApiService, AuthenticationService, NotificationService } from 'src/app/shared/services';
import { Role } from 'src/app/shared/models';
import { Animations } from 'src/app/shared/animations/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./../dashboard/dashboard.component.less', './view.component.less'],
  animations: Animations
})
export class ViewComponent implements OnInit {

  id = null;
  name: '';
  description: '';
  sanitizedData;

  isGathering = true;
  isGatheringViewAll = true;
  viewType = 'list';
  searchText = '';
  searchTerm$ = new Subject<string>();

  filtersCategory = [];
  QueryParams = {
    category: '',
    limit: 25,
    skip: 0,
  };
  returnUrl = '';


  ADMIN = Role.ADMIN;

  event = {
    name: '',
    description: '',
    subtitle: '',
    configuration: { backgroundColor: '', textColor: '', imageSrc: '' }
  };
  allEvents = [];

  constructor(private notificationService: NotificationService, public dialog: MatDialog, public authenticationService: AuthenticationService, private sanitizer: DomSanitizer, private apiService: ApiService, activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe((params) => {
      this.isGathering = true;
      this.isGatheringViewAll = true;
      if (params.id === undefined || params.id === null || params.id === '') {
        this.id = null;
        this.isGathering = false;
        this.isGatheringViewAll = true;
      } else {
        this.id = params.id;
        this.isGathering = true;
        this.isGatheringViewAll = false;
      }
    });
    activatedRouter.queryParams.subscribe((params) => {
      if (params) {
        this.QueryParams = {
          category: !!params.category ? params.category : this.QueryParams.category,
          limit: !!params.limit ? params.limit : this.QueryParams.limit,
          skip: !!params.skip ? params.skip : this.QueryParams.skip,
        };
        this.returnUrl = !!params.returnUrl ? params.returnUrl : '';
      }
      if (this.QueryParams.category) {
        this.filtersCategory.push(this.QueryParams.category);
      }
    });
  }

  ngOnInit() {
    if (this.id === null) {
      this.getAllEvents();
    } else {
      this.getEvent(this.id);
    }

    this.searchTerm$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(text => {
        console.log('searchTerm-' + this.searchText);
        // this.updateResults();
      });
  }

  getEvent(id) {
    this.isGathering = true;
    this.apiService.getEvent(id)
      .then((res: any) => {
        console.log(res);

        this.event.name = res.name;
        this.event.subtitle = res.subtitle;
        this.event.description = res.description;
        this.event.configuration = res.configuration;

        const temp: any = this.sanitizer.bypassSecurityTrustHtml(res.data);
        this.sanitizedData = (temp && temp.hasOwnProperty('changingThisBreaksApplicationSecurity'))
                              ? temp.changingThisBreaksApplicationSecurity
                              : temp;

        this.isGathering = false;
      })
      .catch(err => {
        console.log(err);
        this.isGathering = false;
      });
  }

  getAllEvents() {
    this.isGatheringViewAll = true;

    let params = new HttpParams();
    if (!!this.QueryParams.category) {
      params = params.set('category', String(this.QueryParams.category).toLowerCase());
    }
    params = params.set('limit', String(this.QueryParams.limit));
    params = params.set('skip', String(this.QueryParams.skip));

    this.apiService.getAllEvents(params)
      .then((res: any) => {
        this.allEvents = res;
        this.isGatheringViewAll = false;
      })
      .catch(err => {
        console.log(err);
        this.isGatheringViewAll = false;
      });
  }

  delete(id: string) {
    this.apiService.deleteEvent(id)
      .then(() => {
        console.log('Deleted!');
        this.notificationService.showNotification('Deleted!', null, {panelClass: 'notification-error'});
        if (this.id) {
          this.router.navigate(['/home']);
        } else {
          this.updateResults();
        }
      })
      .catch(err => console.log(err));
  }

  viewEvent(id) {
    this.router.navigate(['/home/view', id], { queryParams: { returnUrl: window.location.pathname } });
  }

  removeFilterCategory(item) {
    this.filtersCategory.splice(this.filtersCategory.indexOf(item), 1);

    this.QueryParams.category = this.filtersCategory.length > 0 ? this.filtersCategory[0] : '';
    this.updateResults();
  }

  resetFilterCategory() {
    this.filtersCategory = [];

    this.QueryParams.category = '';
    this.updateResults();
  }

  openFilterEventDialog() {
    const dialogRef = this.dialog.open(FilterEventComponent, {
      width: '400px',
      data: this.filtersCategory.length > 0 ? this.filtersCategory[0] : '',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.filtersCategory = [result];

      this.QueryParams.category = this.filtersCategory.length > 0 ? this.filtersCategory[0] : '';
      this.updateResults();
    });
  }

  addAddEventDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '400px',
      data: this.filtersCategory,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.apiService.saveEvent(result)
        .then(() => {
          this.updateResults();
        })
        .catch((error) => {
          console.log('Error in saving - ', error);
        });
    });
  }

  deleteEventDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteEventComponent, {
      width: '500px',
      minHeight: '150px',
      data: id,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.delete(result);
    });
  }

  updateResults() {
    this.getAllEvents();
  }

  refresh() {
    this.updateResults();
  }

  deleteAll() {
    this.apiService.deleteAllEvent()
    .then(() => {
      this.updateResults();
    })
    .catch((error) => {
      console.log('Error in saving - ', error);
    });
  }


}
