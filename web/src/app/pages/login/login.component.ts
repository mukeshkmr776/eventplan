import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  submitted = false;
  error: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    setTimeout(() => {
      // add the css-style to the html and body tags
      this.bodyTag.classList.add('login-page');
      this.htmlTag.classList.add('login-page');
    }, 0);

    this.loginForm = this.formBuilder.group({
      username: ['admin', Validators.required],
      password: ['admin', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.loading = false;
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error.error ? error.error : (error.message ? error.message : 'Something went wrong!');
                setTimeout(() => {
                  this.loading = false;
                }, 1000);
            });
    }

  ngOnDestroy() {
    setTimeout(() => {
      // remove the the body classes
      this.bodyTag.classList.remove('login-page');
      this.htmlTag.classList.remove('login-page');
    }, 0);
  }

}
