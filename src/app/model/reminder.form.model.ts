export class ReminderForm {
  constructor(
    public id: number,
    public message: string,
    public duration: number,
    public priority: string,
  ) {}
}
