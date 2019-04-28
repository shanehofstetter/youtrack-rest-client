import { BaseEndpoint } from "./base";
import { ReducedUserImpl, ReducedUser, User, UserImpl } from "..";
import { PaginationOptions } from "../options/pagination_options";

export const UserPaths = {
    current: '/admin/users/me',
    users: '/admin/users',
    user: '/admin/users/{userId}'
};

export class UserEndpoint extends BaseEndpoint {

    public current(): Promise<User> {
        return this.getResourceWithFields<User>(UserPaths.current, UserImpl);
    }

    public all(paginationOptions: PaginationOptions = {}): Promise<ReducedUser[]> {
        return this.getResourceWithFields<ReducedUser[]>(UserPaths.users, ReducedUserImpl, { qs: paginationOptions });
    }

    public byId(userId: string): Promise<User> {
        return this.getResourceWithFields<User>(this.format(UserPaths.user, { userId }), UserImpl);
    }
}
