import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Reminder } from '../model/reminder.model';
import { BaseChartDirective } from 'ng2-charts';
import { Patient } from '../model/patient.model';
import { Graph } from '../model/graph.model';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css'],
})
export class ReminderListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private doctorId: number;
  private patientId: number;

  columnsToDisplay: string[] = ['id', 'priority', 'duration', 'createDt', 'doneStatus'];
  dsReminders: MatTableDataSource<Reminder>;
  graph: Graph;
  graphData: number [] = [];
  reminders: Reminder[];
  expandedElement: any;
  patient: Patient;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.apiService.authUserObservable.subscribe(user => {
      if (user) {
        this.doctorId = user.ownerId;
      } else if (localStorage.length) {
        this.doctorId = +localStorage.getItem('userId');
      }
    });
  }

  showForm() {
    this.router.navigate([`/patient/${this.patientId}/create-reminder`])
  }

  ngOnInit(): void {
    this.getReminders();
  }

  getPatientReminders(row){
    this.router.navigate([`/patient/${row.id}/reminders`]);
  }

  getReminders() {
    this.patientId = +this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.patientId) {
      this.router.navigate(['patient-list']);
    }
    this.apiService.getDetailPatientById(this.patientId).subscribe(patient =>{
      this.patient = patient;
    });

    this.apiService.getAllRemindersByPatientId(this.patientId).subscribe(reminders => {
      this.reminders = reminders;
      this.dsReminders = new MatTableDataSource(reminders);
      this.dsReminders.paginator = this.paginator;
      this.dsReminders.sort = this.sort;
    });

    this.getGraphData();
    this.populateChart();
  }

  getGraphData() {
    this.apiService.getGraphData(this.patientId).subscribe(graph => {
      this.graph = graph;
    });
    /*this.graphData.push(this.graph.unfinished0);
    this.graphData.push(this.graph.unfinished1);
    this.graphData.push(this.graph.unfinished2);
    this.graphData.push(this.graph.unfinished3);
    this.graphData.push(this.graph.unfinished4);
    this.graphData.push(this.graph.unfinished5);
    this.graphData.push(this.graph.unfinished6);*/
    this.graphData.push(65);
    this.graphData.push(55);
    this.graphData.push(43);
    this.graphData.push(12);
    this.graphData.push(29);
    this.graphData.push(34);
    this.graphData.push(20);
  }

  applyFilter(filterValue: string) {
    this.dsReminders.filter = filterValue.trim().toLowerCase();

    if (this.dsReminders.paginator) {
      this.dsReminders.paginator.firstPage();
    }
  }

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType = 'bar';
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barData = [65, 59, 80, 81, 56, 55, 40]

  public barChartLegend = true;
  public barChartData = [
    {
      data: this.barData,
      label: 'Overdue count for last 7 days'
    }
  ];



  populateChart(){
    const chartData = [];


    for (let i=0; i<7; i++){
      var d = new Date();
      d.setDate(d.getDate() - i);
      chartData.push({
        label: d.toDateString(),
        value: 0
      });
      chartData[this.graphData[i]].value++;
    }

    chartData.forEach(element => {
      this.chart.labels.push(element.label);
      this.chart.datasets.forEach((dataset)=>{
        dataset.data.push(element.value);
      });
    });


    this.chart.update();

    //console.log(chartData);
  }

  /*
  //for bar chart
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  public chartOptions = {
    responsive: true,
    scaleShowVerticalLines: true,
  };
  public chartType = 'bar';
  public chartLabels =  ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public chartData = [
    {
        label: 'Overdue count for last 7 days'
    }
  ];
  chartLegend = true;

  populateChart(){
    const chartData = [];

    console.log(this.graphData);

    for (let i=0; i<7; i++){
      var d = new Date();
      d.setDate(d.getDate() - i);
      chartData.push({
        label: d.toDateString(),
        value: this.graphData[i]
      });
    }

    chartData.forEach(element => {
      this.chart.labels.push(element.label);
      this.chart.datasets.forEach((dataset)=>{
        dataset.data.push(element.value);
      });
    });


    this.chart.update();
  }
  */
}
