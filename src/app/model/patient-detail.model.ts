export class PatientDetail {
  presId: number;
  prescription: string;
  docId: number;
  docName: string;
  patId: number;
  patName: string;
  unfinishedHigh: number;
  unfinishedMiddle: number;
  unfinishedLow: number;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }

}
