import { Component } from '@angular/core';
import { User } from './model/user.model';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctor-dashboard';

  user: User;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    this.apiService.authUserObservable.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('userId', JSON.stringify(this.user.id));
      } else {
        this.user = null;
      }
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }

}
