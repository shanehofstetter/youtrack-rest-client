import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {ReducedUserImpl, ReducedUser, User, UserImpl} from "..";
import {generateFieldsQuery} from "../entities/fields/utils";

export class UserEndpoint extends BaseEndpoint {

    private currentUser: User | null = null;
    private fields: string = generateFieldsQuery(new UserImpl());
    private minimalFields: string = generateFieldsQuery(new ReducedUserImpl());

    public current(): Promise<User> {
        return this.toPromise<User>(this.client.get(urls.USER_CURRENT, {qs: {fields: this.fields}})).then(response => {
            this.currentUser = response;
            return response;
        });
    }

    public all(): Promise<ReducedUser[]> {
        return this.toPromise<ReducedUser[]>(this.client.get(urls.USERS, {qs: {fields: this.minimalFields}})).then(response => {
            return response;
        });
    }
}
