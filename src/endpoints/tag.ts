import {BaseEndpoint} from "./base";
import {IssueTag, IssueTagImpl} from "../entities/issueTag";
import {UserPaths} from "./user";

export const TagPaths = {
    user_tags: UserPaths.user + '/tags',
    current_user_tags: UserPaths.current + '/tags',
    current_user_tag: UserPaths.current + '/tags' + '/{tagId}',
    user_tag: UserPaths.user + '/tags' + '/{tagId}'
}

export class TagEndpoint extends BaseEndpoint {

    public allForUser(userId: string): Promise<IssueTag[]> {
        return this.getResourceWithFields<IssueTag[]>(this.format(TagPaths.user_tags, {userId}), IssueTagImpl);
    }

    public all(): Promise<IssueTag[]> {
        return this.getResourceWithFields<IssueTag[]>(TagPaths.current_user_tags, IssueTagImpl);
    }

    public byId(tagId: string): Promise<IssueTag> {
        return this.getResourceWithFields<IssueTag>(this.format(TagPaths.current_user_tag, {tagId}), IssueTagImpl);
    }

    public byIdForUser(userId: string, tagId: string): Promise<IssueTag> {
        return this.getResourceWithFields<IssueTag>(this.format(TagPaths.user_tag, {userId, tagId}), IssueTagImpl);
    }
}
