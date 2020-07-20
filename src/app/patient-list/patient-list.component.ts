import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Patient } from '../model/patient.model';

import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Prescription } from '../model/prescription.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PatientListComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('outerTables') outerTables: QueryList<MatTable<Patient>>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Prescription>>;

  dsPatients: MatTableDataSource<Patient>;
  patients: Patient[] = [];

  columnsToDisplay: string[] = ['id', 'firstname', 'lastname'];
  innerDisplayedColumns: string[] = ['id', 'prescription', 'createDt'];
  expandedElement: Patient | null;

  private doctorId: number;

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) {
    this.apiService.authUserObservable.subscribe(user => {
      if (user) {
        this.doctorId = user.ownerId;
      } else {
        this.doctorId = null;
      }
    });
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.apiService.getAllPatients(this.doctorId).subscribe((data : Patient[])=>{
      data.forEach(patient => {
        if (patient.prescriptions && Array.isArray(patient.prescriptions) && patient.prescriptions.length) {
          this.patients = [...this.patients, {...patient, prescriptions: new MatTableDataSource(patient.prescriptions)}];
        } else {
          this.patients = [...this.patients, patient];
        }
      });
      this.dsPatients = new MatTableDataSource(this.patients);
      this.dsPatients.sort = this.sort;
    });
  }

  toggleRow(element: Patient) {
    element.prescriptions && (element.prescriptions as MatTableDataSource<Prescription>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Prescription>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.outerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Patient>).filter = filterValue.trim().toLowerCase());
  }

  applyInnerFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Prescription>).filter = filterValue.trim().toLowerCase());
  }
}
