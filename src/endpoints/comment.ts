import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {Comment} from "..";

export class CommentEndpoint extends BaseEndpoint {
    public all(issueId: string): Promise<Comment[]> {
        return this.toPromise<Comment[]>(this.client.get(this.format(urls.ISSUE_COMMENTS, {issue: issueId})));
    }

    public create(issueId: string, comment: string): Promise<any> {
        return this.toPromise(this.client.post(this.format(urls.ISSUE_EXECUTE, {issue: issueId}), {
            form: {comment: comment}
        }));
    }

    public update(issueId: string, commentId: string, comment: string): Promise<any> {
        return this.toPromise(this.client.put(this.format(urls.ISSUE_COMMENT, {
            issue: issueId, comment: commentId
        }), {
            body: {text: comment}
        }));
    }

    public delete(issueId: string, commentId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(urls.ISSUE_COMMENT, {
            issue: issueId,
            comment: commentId
        })));
    }
}
