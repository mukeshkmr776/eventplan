import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService, NotificationService } from './../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(catchError(err => {
          if ([401, 403, 423].indexOf(err.status) !== -1) {
              // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
              this.authenticationService.logout();
              this.router.navigate(['/login'], { queryParams: { returnUrl: window.location.pathname } });
              this.notificationService.showNotification('Not Authorised!', null, { panelClass: 'notification-error' });
          }

          if ([400].indexOf(err.status) !== -1) {
            this.notificationService.showNotification('Bad Request', null, { panelClass: 'notification-error' });
          }

          return throwError(err);
      }))
    }
}
