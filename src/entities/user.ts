import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";

export interface User {
    filterFolder: string;
    lastCreatedProject: string;
    login: string;
    email: string;
    jabber: string;
    fullName: string;
    avatar: string;
    guest: boolean;
}

export class UserEndpoint extends BaseEndpoint {

    private currentUser: User | null = null;

    public current(): Promise<User> {
        return this.toPromise<User>(this.client.get(urls.USER_CURRENT)).then(response => {
            this.currentUser = response;
            return response;
        });
    }

    public byName(name: string): Promise<User> {
        return this.toPromise<User>(this.client.get(this.format(urls.USER_BY_NAME, {name}))).then(response => {
            return response;
        });
    }
}