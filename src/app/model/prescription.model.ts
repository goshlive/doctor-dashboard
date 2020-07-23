import { Reminder } from "./reminder.model";
import { MatTableDataSource } from '@angular/material/table';

export class Prescription {
  id: number;
  prescription: string;
  createDt: string;
  updateDt: string;

  reminders?: Reminder[] | MatTableDataSource<Reminder>;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
