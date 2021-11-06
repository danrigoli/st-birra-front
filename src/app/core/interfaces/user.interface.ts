export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
    roleId: number;
}

export class User {
    constructor(userData: User) {
        this.id = userData.id;
        this.name = userData.name;
        this.roleId = userData.roleId;
        this.email = userData.email;
        this.token = userData.token;
    }
}