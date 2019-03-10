import { ReducedUser, ReducedUserImpl } from "./user";

export class ReducedIssueTagImpl {
    name: string = '';
    id: string = '';
}

export class IssueTagImpl extends ReducedIssueTagImpl {
    // visibleFor: UserGroup;
    // updateableBy: UserGroup;
    untagOnResolve: boolean = false;
    owner: ReducedUser = new ReducedUserImpl();
}

export interface IssueTag extends IssueTagImpl {
}

export interface ReducedIssueTag extends ReducedIssueTagImpl {
}
