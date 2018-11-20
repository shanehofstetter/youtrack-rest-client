export class ReducedUserImpl {
    email: string = '';
    fullName: string = '';
    login: string = '';
    name: string = '';
    id: string = '';
}

export class UserImpl extends ReducedUserImpl {
    avatarUrl: string = '';
    banned: boolean = false;
    online: boolean = false;
    guest: boolean = false;
    jabberAccountName: string = '';
    ringId: string = '';
    tags: string = '';
}

export interface User extends UserImpl {
}

export interface ReducedUser extends ReducedUserImpl {
}
