import { Prescription } from "./prescription.model";
import { MatTableDataSource } from '@angular/material/table';

export class Patient {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  createDt: string;
  updateDt: string;

  prescriptions?: Prescription[] | MatTableDataSource<Prescription>;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
