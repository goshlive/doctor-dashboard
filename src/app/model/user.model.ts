export class User {
    id: number;
    username: string;
    email: string;
    roles: string;
    ownerId: number;
    isActive: number;
    createDt: string;
    updateDt: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}