import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';
import { ReminderListComponent } from './reminder-list/reminder-list.component';
//import { PostReminderComponent } from './post-reminder/post-reminder.component';

const routes: Routes = [
  { path: '', redirectTo: 'patient-list', pathMatch: 'full' },
  { path: 'patient-list', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: 'patient/:id/reminders', component: ReminderListComponent, canActivate: [AuthGuard] },
  //{ path: 'patient/:id/create-reminder', component: PostReminderComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
