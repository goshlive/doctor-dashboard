export class Reminder {
    id: number;
    docId: number;
    presId: number;
    doctorName: string;
    prescription: string;
    message: string;
    priority: string;
    duration: number;
    lateInd: number;
    elapsed: string;
    createDt: string;
    doneDt: string;
    doneStatus: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
