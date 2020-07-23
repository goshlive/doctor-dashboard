export class PatientDetail {
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
