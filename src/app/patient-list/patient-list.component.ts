import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Reminder } from '../model/reminder.model';
import { PatientDetail } from '../model/patient-detail.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private doctorId: number;

  columnsToDisplay: string[] = ['patId', 'patName', 'unfinishedHigh', 'unfinishedMiddle', 'unfinishedLow'];
  dsPatients: MatTableDataSource<PatientDetail>;
  patients: PatientDetail[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.apiService.authUserObservable.subscribe(user => {
      if (user) {
        this.doctorId = user.ownerId;
      } else {
        this.doctorId = this.getId();
      }
    });
    this.getPatients();
  }

  getId() {
    if (this.doctorId) {
      return this.doctorId;
    } else if (localStorage.length) {
      return +localStorage.getItem('userId');
    }
  }

  ngOnInit(): void {

  }


  getPatientReminders(row){
    this.router.navigate([`/patient/${row.patId}/${row.presId}`]);
  }

  getReminders(reminders: Reminder[]) {
    var dsRems: MatTableDataSource<Reminder>;
    dsRems = new MatTableDataSource(reminders);
    return dsRems;
  }

  getPatients() {
    this.apiService.getAllPatientDetails(this.getId()).subscribe((data : PatientDetail[])=>{
      this.dsPatients = new MatTableDataSource(data);
      this.dsPatients.paginator = this.paginator;
      this.dsPatients.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dsPatients.filter = filterValue.trim().toLowerCase();

    if (this.dsPatients.paginator) {
      this.dsPatients.paginator.firstPage();
    }
  }
}
