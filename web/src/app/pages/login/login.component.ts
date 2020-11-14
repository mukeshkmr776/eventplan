import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, ApiService } from 'src/app/shared/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private ApiService: ApiService) {
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

  onUploadAudioFile(file?: any) {
    // let extension = file[0] ? file[0].name.substr(file[0].name.lastIndexOf('.') + 1) : '';
    // debugger;
    // if (extension !== 'mp3' && extension !== 'wav') {
    //   console.log('invalid');
    // }
    // debugger;
    console.log('inside onUploadAudioFile');

    let formData = new FormData();
    formData.append('uploadFile', this.image);

    // const HttpUploadOptions = { headers: new HttpHeaders({ "Content-Type": "multipart/form-data" }) };

    this.ApiService.uploadAudioFile(formData)
        .then(resp => console.log('File uploaded successfully-> ', resp))
        .catch(err => console.log('File upload error->', err));
  }

  image;
  selectAudioFile(event) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  ngOnDestroy() {
    setTimeout(() => {
      // remove the the body classes
      this.bodyTag.classList.remove('login-page');
      this.htmlTag.classList.remove('login-page');
    }, 0);
  }

}
