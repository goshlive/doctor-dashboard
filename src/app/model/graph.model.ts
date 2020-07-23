export class Graph {
  docId: number;
  docName: string;
  patId: number;
  patName: string;
  createDt: Date;
  unfinished0: number;
  unfinished1: number;
  unfinished2: number;
  unfinished3: number;
  unfinished4: number;
  unfinished5: number;
  unfinished6: number;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }

}
