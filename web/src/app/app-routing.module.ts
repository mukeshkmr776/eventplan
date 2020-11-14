import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewComponent } from './pages/view/view.component';
import { EditComponent } from './pages/edit/edit.component';

import { AuthGuard } from './shared/services';
import { Role } from './shared/models';

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'view',
        children: [
          { path: '', component: ViewComponent },
          { path: ':id', component: ViewComponent }
        ]
      },
      { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } }
    ]
  },


  {
    path: '', // If no path given, then redirect to this path
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**', // If wrong path is given, then redirect to this path
    redirectTo: 'home'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
