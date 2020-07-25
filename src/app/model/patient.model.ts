export class Patient {
  id: number;
  name: string;
  firstname: string;
  lastname: string;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
