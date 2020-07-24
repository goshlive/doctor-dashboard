import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Reminder } from '../model/reminder.model';
import { BaseChartDirective, Label } from 'ng2-charts';
import { Graph } from '../model/graph.model';
import { Patient } from '../model/patient.model';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css'],
})
export class ReminderListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private patientId: number;

  columnsToDisplay: string[] = ['id', 'priority', 'duration', 'createDt', 'doneStatus'];
  dsReminders: MatTableDataSource<Reminder>;
  reminders: Reminder[];
  expandedElement: any;
  patient: Patient;
  presId: number;

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  private graphData: Graph;
  public chartData = new Array();
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartLabels: Label[] = new Array();
  public barChartData = [
    {
      data: new Array(),
      label: '',
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  showForm() {
    this.router.navigate([`/patient/${this.patientId}/${this.presId}/create-reminder`])
  }

  ngOnInit(): void {
    this.getReminders();
  }

  getReminders() {
    this.patientId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.presId = +this.activatedRoute.snapshot.paramMap.get('presId');

    this.apiService.getPatientById(this.patientId).subscribe(patient =>{
      this.patient = patient;

      this.apiService.getRemindersByPatientId(this.patientId).subscribe(reminders => {
        this.reminders = reminders;
        this.dsReminders = new MatTableDataSource(reminders);
        this.dsReminders.paginator = this.paginator;
        this.dsReminders.sort = this.sort;

        this.getGraphData();
      });
    });
  }

  getGraphData() {
    this.apiService.getGraphData(this.patientId).subscribe(graph => {
      this.graphData = new Graph(graph);
      this.populateChart();
    });
  }

  applyFilter(filterValue: string) {
    this.dsReminders.filter = filterValue.trim().toLowerCase();

    if (this.dsReminders.paginator) {
      this.dsReminders.paginator.firstPage();
    }
  }

  populateChart(){
    for (let i=7; i>0; i--){
      var d = new Date();
      d.setDate(d.getDate() - i);
      this.barChartLabels.push(d.toLocaleDateString());
    }
    this.barChartData.push(
      {
        label: "Unfinished reminders last 7 days",
        data: [this.graphData.unfinished0,this.graphData.unfinished1, this.graphData.unfinished2, this.graphData.unfinished3,
        this.graphData.unfinished4, this.graphData.unfinished5, this.graphData.unfinished6]
      }
    );
  }
}
