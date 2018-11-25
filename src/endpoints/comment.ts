import {BaseEndpoint} from "./base";
import {Comment, IssuePaths} from "..";

export namespace CommentPaths {
    export const comment = '/issue/{issue}/comment/{comment}';
    export const comments = '/issue/{issue}/comment/{comment}';
}

export class CommentEndpoint extends BaseEndpoint {

    public all(issueId: string): Promise<Comment[]> {
        return this.toPromise<Comment[]>(this.client.get(this.format(CommentPaths.comments, {issue: issueId})));
    }

    public create(issueId: string, comment: string): Promise<any> {
        return this.toPromise(this.client.post(this.format(IssuePaths.execute, {issue: issueId}), {
            form: {comment: comment}
        }));
    }

    public update(issueId: string, commentId: string, comment: string): Promise<any> {
        return this.toPromise(this.client.put(this.format(CommentPaths.comment, {
            issue: issueId, comment: commentId
        }), {
            body: {text: comment}
        }));
    }

    public delete(issueId: string, commentId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(CommentPaths.comment, {
            issue: issueId,
            comment: commentId
        })));
    }
}
