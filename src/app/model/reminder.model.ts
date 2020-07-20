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
    createDt: string;
    doneDt: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}