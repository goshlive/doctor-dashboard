import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from   'rxjs/operators';

import { User } from '../model/user.model';
import { Patient } from '../model/patient.model';
import { Reminder } from '../model/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://62.171.189.140:9090/api';

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

  getAllReminders(doctorId: number): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.url}/patients/doctor/${doctorId}`).pipe(
      map(
        data => {
          return data.map((reminder) => new Reminder(reminder));
        }
      )
    )
  }

  getAllPatients(doctorId: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.url}/patients/doctor/${doctorId}`).pipe(
      map(
        data => {
          return data.map((patient) => new Patient(patient));
        }
      )
    )
  }
}
