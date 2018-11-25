import {BaseEndpoint} from "./base";
import {IssueTag, IssueTagImpl} from "../entities/issueTag";
import {UserPaths} from "./user";

export namespace TagPaths {
    export const user_tags = UserPaths.user + '/tags';
    export const current_user_tags = UserPaths.current + '/tags';
}

export class TagEndpoint extends BaseEndpoint {

    public forUser(userId: string): Promise<IssueTag[]> {
        return this.getResourceWithFields<IssueTag[]>(this.format(TagPaths.user_tags, {id: userId}), IssueTagImpl);
    }

    public forCurrentUser(): Promise<IssueTag[]> {
        return this.getResourceWithFields<IssueTag[]>(TagPaths.current_user_tags, IssueTagImpl);
    }
}
