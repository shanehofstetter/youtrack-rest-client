import {YoutrackClient} from "../youtrack";
import {urls} from "../config/urls";
import * as format from "string-template";

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

export class UserEndpoint {

    private currentUser: User | null = null;

    public constructor(private client: YoutrackClient) {
    }

    public current(): Promise<User> {
        return Promise.resolve(this.client.get(urls.USER_CURRENT).then(response => {
            this.currentUser = response;
            return response;
        }).catch(error => {
            console.error(error.message);
            throw new Error(error);
        }));
    }

    public byName(name: string): Promise<User> {
        return Promise.resolve(this.client.get(format(urls.USER_BY_NAME, {name})).then(response => {
            return response;
        }).catch(error => {
            console.error(error.message);
            throw new Error(error);
        }));
    }
}