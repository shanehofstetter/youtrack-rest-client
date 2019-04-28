import { BaseEndpoint } from "./base";
import { IssueTag, IssueTagImpl } from "../entities/issueTag";
import { PaginationOptions } from "../options/pagination_options";

export const TagPaths = {
    issueTags: '/issueTags',
    issueTag: '/issueTags/{tagId}'
};

export class TagEndpoint extends BaseEndpoint {

    public all(paginationOptions: PaginationOptions = {}): Promise<IssueTag[]> {
        return this.getResourceWithFields<IssueTag[]>(TagPaths.issueTags, IssueTagImpl, { qs: paginationOptions });
    }

    public byId(tagId: string): Promise<IssueTag> {
        return this.getResourceWithFields<IssueTag>(this.format(TagPaths.issueTag, { tagId }), IssueTagImpl);
    }
}
