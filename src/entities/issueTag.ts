import {ReducedUser, ReducedUserImpl} from "./user";

export class IssueTagImpl {
    name: string = '';
    id: string = '';
    // visibleFor: UserGroup;
    // updateableBy: UserGroup;
    untagOnResolve: boolean = false;
    owner: ReducedUser = new ReducedUserImpl();
}

export interface IssueTag extends IssueTagImpl {

}
