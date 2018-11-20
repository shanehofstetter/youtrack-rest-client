import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {User} from "..";

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