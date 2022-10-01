import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthGuard } from 'src/services/auth.service';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageRomsComponent } from './pages/admin/manage-roms/manage-roms.component';
import { ManageScribesComponent } from './pages/admin/manage-scribes/manage-scribes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { paths } from './utilities/paths.util';
import { ManageLawsComponent } from './pages/scribe/manage-laws/manage-laws.component';

const routes: Routes = [
  // {
  //   path: paths.general.default,
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: paths.general.default,
    component: LoginComponent,
    canActivate: [LoginAuthGuard],
  },
  {
    path: paths.general.profile,
    component: ProfileComponent,
    // canActivate: [LoginAuthGuard],
  },
  {
    path: paths.admin.dashboard,
    component: DashboardComponent,
    // canActivate: [LoginAuthGuard],
  },
  {
    path: paths.admin.manageScribes,
    component: ManageScribesComponent,
    // canActivate: [LoginAuthGuard],
  },
  {
    path: paths.admin.manageRoMs,
    component: ManageRomsComponent,
    // canActivate: [LoginAuthGuard],
  },
  {
    path: paths.scribe.manageLaws,
    component: ManageLawsComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
