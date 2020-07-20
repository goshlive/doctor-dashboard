import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { TableExpandableRowsComponent } from './table-expandable-rows/table-expandable-rows.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'patient-list', pathMatch: 'full' },
//  { path: '', component: TableExpandableRowsComponent },
  { path: 'patient-list', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
