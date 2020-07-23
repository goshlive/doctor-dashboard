import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule  } from '@angular/material/snack-bar';
import { ReminderForm } from '../model/reminder.form.model';
import { Patient } from '../model/patient.model';

@Component({
  selector: 'app-post-reminder',
  templateUrl: './post-reminder.component.html',
  styleUrls: ['./post-reminder.component.css']
})
export class PostReminderComponent implements OnInit {

  patientId: number;
  presId: number;
  patient: Patient;
  reminderModel = new ReminderForm(0,'',0,'');

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.patientId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.presId = +this.activatedRoute.snapshot.paramMap.get('presId');
    this.apiService.getDetailPatientById(this.patientId).subscribe(patient =>{
      this.patient = patient;
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.reminderModel.id = this.presId;
    this.apiService.postReminder(this.reminderModel).subscribe(result => {
      console.log(result);
      this._snackBar.open('data Saved', 'dismiss', {
        duration:3000
      });
      setTimeout(() => {
          this.router.navigate([`/patient/${this.patientId}/${this.presId}`]);
      }, 3000);
    });
  }

}
