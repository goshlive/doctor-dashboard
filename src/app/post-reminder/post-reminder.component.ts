import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule  } from '@angular/material/snack-bar';
import { Reminder } from '../model/reminder.model';

@Component({
  selector: 'app-post-reminder',
  templateUrl: './post-reminder.component.html',
  styleUrls: ['./post-reminder.component.css']
})
export class PostReminderComponent implements OnInit {

  presId: number;

  ngOnInit(): void {
  }

  /*
  reminderModel = new Reminder('','',0,'',{mid: 0});

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.remindersService.getMappingById(this.mid).subscribe(result=> {
      this.mappingInfo = result;
      this.reminderModel.mapping.mid = this.mappingInfo.mid;
    });
  }

  onSubmit(){
    this.remindersService.postReminder(this.reminderModel).subscribe(result => {
      console.log(result);
      this._snackBar.open('data Saved', 'dismiss', {
        duration:3000
      });
      setTimeout(() => {
          this.router.navigate([`/reminders/${this.mappingInfo.mid}`]);
      }, 3000);
    });
  }
*/
}
