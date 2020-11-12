import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { merge } from 'lodash';

import { DeleteEventComponent } from '../../shared/components/modals/DeleteEventComponent';
import { ApiService } from '../../shared/services/api.service';
import { NotificationService } from '../../shared/services';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./../dashboard/dashboard.component.less', './edit.component.less']
})
export class EditComponent implements OnInit {

  id = '';
  data = '';
  sanitizedData;
  event: any = {};

  nameControl = new FormControl('', [Validators.required]);
  descriptionControl = new FormControl('', [Validators.required]);
  configuration = { backgroundColor: '', textColor: '', imageSrc: '' };
  imageEnabled = true;

  matcher = new MyErrorStateMatcher();
  isGathering = true;

  bgColors: any[]  = ['#1976d2', '#673ab7', '#e91e63', '#3f51b5', '#ffffff', '#000000'];
  txtColors: any[] = ['#1976d2', '#673ab7', '#e91e63', '#3f51b5', '#ffffff', '#000000'];

  constructor(private notificationService: NotificationService, public dialog: MatDialog, private sanitizer: DomSanitizer, private apiService: ApiService, activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.getEvent(this.id);
  }

  load() {
    this.sanitizedData = this.sanitizer.bypassSecurityTrustHtml(this.data);
  }

  save() {
    let sanitizedData: any;
    sanitizedData = this.sanitizer.bypassSecurityTrustHtml(this.data);
    sanitizedData = (sanitizedData && sanitizedData.hasOwnProperty('changingThisBreaksApplicationSecurity')) ?
      sanitizedData.changingThisBreaksApplicationSecurity :
      sanitizedData;

    this.event.id = Number(this.id);
    this.event.name = this.nameControl.value || '';
    this.event.description = this.descriptionControl.value || '';
    this.event.data = sanitizedData || '';
    this.event.subtitle = this.event.subtitle || '';

    this.apiService.updateEvent(this.id, this.event)
      .then((event) => {
        console.log('saved!', event);
        this.notificationService.showNotification('Successfully saved!', null, { panelClass: 'notification-success' });
        this.getEvent(this.id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  reset() {
    this.getEvent(this.id);
    this.notificationService.showNotification('Content reset!', null, { panelClass: 'notification-info' });
  }

  getEvent(id) {
    this.apiService.getEvent(id)
      .then((res: any) => {
        this.event = res;
        this.nameControl.setValue(res.name);
        this.descriptionControl.setValue(res.description);
        this.configuration = res.configuration;
        this.data = res.data;

        this.imageEnabled = !!this.configuration.imageSrc;

        this.isGathering = false;
      })
      .catch(err => {
        this.isGathering = false;
        console.log(err);
      });

  }

  delete() {
    this.apiService.deleteEvent(this.id)
      .then(() => {
        console.log('Deleted!');
        this.notificationService.showNotification('Deleted!', null, {panelClass: 'notification-error'});
        this.router.navigate(['/home']);
      })
      .catch(err => console.log(err));
  }

  deleteEventDialog() {
    const dialogRef = this.dialog.open(DeleteEventComponent, {
      width: '500px',
      minHeight: '150px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.delete();
    });
  }

  selectHeaderColor(color: string) {
    this.configuration.backgroundColor = color;
  }

  selectTextColor(color: string) {
    this.configuration.textColor = color;
  }

  onImageEnablechange(checked) {
    this.imageEnabled = checked;
  }

  chooseImage() {
    console.log('inside');
  }



}
