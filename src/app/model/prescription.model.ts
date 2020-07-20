import { Reminder } from "./reminder.model";

export class Prescription {
  id: number;
  prescription: string;
  createDt: string;
  updateDt: string;

  reminders: Reminder[];

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
