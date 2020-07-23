import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginInvalid = false;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async login() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.apiService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
        data => {
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['patient-list']);
        },
        err => {
          this._snackBar.open('Login failed: Wrong Username or Password', 'dismiss', {
            duration:3000
          });
          this.loading = false;
        }
    );
  }

}
