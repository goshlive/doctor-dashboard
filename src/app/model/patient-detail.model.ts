import { Patient } from './patient.model';
export class PatientDetail extends Patient {
  presId: number;
  prescription: string;
  docId: number;
  docName: string;
  unfinishedHigh: number;
  unfinishedMiddle: number;
  unfinishedLow: number;

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }

}
