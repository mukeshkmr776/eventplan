// @{Internal Imports}
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// @{External Imports}
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewComponent } from './pages/view/view.component';

import { GatheringDataComponent, LoaderComponent, MenuComponent, CopyrightComponent, AddEventComponent, DeleteEventComponent, FilterEventComponent } from './shared/components';
import { FuseSplashScreenService, TreeService, DataService, ApiService, MemoryService, NotificationService, AuthenticationService, AuthGuard } from './shared/services';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, DashboardComponent, LoginComponent, ViewComponent, EditComponent,
    GatheringDataComponent, LoaderComponent, AddEventComponent, DeleteEventComponent, FilterEventComponent, MenuComponent, CopyrightComponent,
    FilterPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    EditorModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // HttpClientInMemoryWebApiModule.forRoot(MemoryService),
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    FuseSplashScreenService, TreeService, DataService, ApiService, MemoryService, NotificationService, AuthenticationService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
