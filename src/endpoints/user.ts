import {BaseEndpoint} from "./base";
import {ReducedUserImpl, ReducedUser, User, UserImpl} from "..";

export const UserPaths = {
    current: '/admin/users/me',
    users: '/admin/users',
    user: '/admin/users/{userId}'
}

export class UserEndpoint extends BaseEndpoint {

    public current(): Promise<User> {
        return this.getResourceWithFields<User>(UserPaths.current, UserImpl);
    }

    public all(): Promise<ReducedUser[]> {
        return this.getResourceWithFields<ReducedUser[]>(UserPaths.users, ReducedUserImpl);
    }

    public byId(userId: string): Promise<User> {
        return this.getResourceWithFields<User>(this.format(UserPaths.user, {userId}), UserImpl);
    }
}
