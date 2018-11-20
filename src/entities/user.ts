export class MinimalUserImpl {
    email: string = '';
    fullName: string = '';
    login: string = '';
    name: string = '';
    id: string = '';
}

export class UserImpl extends MinimalUserImpl {
    avatarUrl: string = '';
    banned: boolean = false;
    online: boolean = false;
    guest: boolean = false;
    jabberAccountName: string = '';
    ringId: string = '';
    tags: string = '';
    profiles: any[] = [];
}

export interface User extends UserImpl {
}

export interface MinimalUser extends MinimalUserImpl {
}
