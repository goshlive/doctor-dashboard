import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap, first } from   'rxjs/operators';

import { User } from '../model/user.model';
import { PatientDetail } from '../model/patient-detail.model';
import { Reminder } from '../model/reminder.model';
import { Graph } from '../model/graph.model';
import { ReminderForm } from '../model/reminder.form.model';
import { Patient } from '../model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url = 'http://62.171.189.140:9090/api';
  url = 'http://localhost:8080/api';

  private authUser = new ReplaySubject<any>(1);
  public authUserObservable = this.authUser.asObservable();

  constructor(private http: HttpClient) {
  }

  login(username: String, password: String) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.post(`${this.url}/doctor/login`,
      {username: username, password: password, headers: headers}
    ).pipe(tap(
      userResponse => {
        return this.handleLoginResponse(new User(userResponse));
      }
    ));
  }

  private handleLoginResponse(user: User){
    this.authUser.next(user);
    return user;
  }

  getPatientById(pid: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.url}/patient/${pid}`).pipe()
  }

  getRemindersByPatientId(pid: number): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.url}/patient/${pid}/reminders/`).pipe(
      map(
        data => {
          return data.map((reminder) => new Reminder(reminder));
        }
      )
    )
  }

  getAllReminders(doctorId: number): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.url}/patients/doctor/${doctorId}`).pipe(
      map(
        data => {
          return data.map((reminder) => new Reminder(reminder));
        }
      )
    )
  }

  getAllPatientDetails(doctorId: number): Observable<PatientDetail[]> {
    return this.http.get<PatientDetail[]>(`${this.url}/patient-details/doctor/${doctorId}`).pipe(
      map(
        data => {
          return data.map((patient) => new PatientDetail(patient));
        }
      )
    )
  }

  getGraphData(patientId: number): Observable<Graph> {
    return this.http.get<Graph>(`${this.url}/patient-graph/${patientId}`).pipe(
      map(
        data => {
          return data;
        }
      )
    )
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  postReminder(reminder: ReminderForm): Observable<any>{
    return this.http.post<any>(
      `${this.url}/post/reminder`, reminder, this.httpOptions
    ).pipe(
      map(
        results => {
          console.log(results);
          return results;
        }
      )
    )
  }

}
