import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";

export interface Comment {
    id: string;
    author: string;
    authorFullName: string;
    issueId: string;
    parentId: any;
    deleted: boolean;
    jiraId: any;
    text: string;
    shownForIssueAuthor: boolean,
    created: number;
    updated: any
    permittedGroup: any;
    replies: any[];
}

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
