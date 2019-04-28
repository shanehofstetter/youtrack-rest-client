import { BaseEndpoint } from "./base";
import { IssueTag, IssueTagImpl } from "../entities/issueTag";
import { UserPaths } from "./user";

export const TagPaths = {
    userTags: UserPaths.user + '/tags',
    currentUserTags: UserPaths.current + '/tags',
    currentUserTag: UserPaths.current + '/tags' + '/{tagId}',
    userTag: UserPaths.user + '/tags' + '/{tagId}'
};

export class TagEndpoint extends BaseEndpoint {

    public allForUser(userId: string): Promise<IssueTag[]> {
        return this.getResourceWithFields<IssueTag[]>(this.format(TagPaths.userTags, { userId }), IssueTagImpl);
    }

    public all(): Promise<IssueTag[]> {
        return this.getResourceWithFields<IssueTag[]>(TagPaths.currentUserTags, IssueTagImpl);
    }

    public byId(tagId: string): Promise<IssueTag> {
        return this.getResourceWithFields<IssueTag>(this.format(TagPaths.currentUserTag, { tagId }), IssueTagImpl);
    }

    public byIdForUser(userId: string, tagId: string): Promise<IssueTag> {
        return this.getResourceWithFields<IssueTag>(this.format(TagPaths.userTag, { userId, tagId }), IssueTagImpl);
    }
}
