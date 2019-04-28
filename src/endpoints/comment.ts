import { BaseEndpoint } from "./base";
import { IssueComment, IssueCommentImpl, UpdateIssueComment } from "../entities/comment";
import { PaginationOptions } from "../options/pagination_options";

export const CommentPaths = {
    comment: '/issues/{issueId}/comments/{commentId}',
    comments: '/issues/{issueId}/comments'
};

export class CommentEndpoint extends BaseEndpoint {

    public all(issueId: string, paginationOptions: PaginationOptions = {}): Promise<IssueComment[]> {
        return this.getResourceWithFields<IssueComment[]>(this.format(CommentPaths.comments, { issueId }), IssueCommentImpl, { qs: paginationOptions });
    }

    public create(issueId: string, comment: IssueComment): Promise<any> {
        return this.postResourceWithFields<IssueComment>(this.format(CommentPaths.comments, { issueId }), IssueCommentImpl, {
            body: comment
        });
    }

    public update(issueId: string, comment: UpdateIssueComment): Promise<IssueComment> {
        return this.postResourceWithFields<IssueComment>(this.format(CommentPaths.comment, {
            issueId,
            commentId: comment.id
        }), IssueCommentImpl, {
            body: comment
        });
    }

    public delete(issueId: string, commentId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(CommentPaths.comment, { issueId, commentId })));
    }
}
