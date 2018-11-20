import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {ReducedUserImpl, ReducedUser, User, UserImpl} from "..";

export class UserEndpoint extends BaseEndpoint {

    public current(): Promise<User> {
        return this.getResourceWithFields<User>(urls.USER_CURRENT, UserImpl);
    }

    public all(): Promise<ReducedUser[]> {
        return this.getResourceWithFields<ReducedUser[]>(urls.USERS, ReducedUserImpl);
    }
}
