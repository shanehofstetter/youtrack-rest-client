import { ReducedUserImpl, ReducedUser } from "./user";
import { ReducedIssue, ReducedIssueImpl } from "./issue";

// TODO: add attachment and visibilty typings
export class IssueCommentImpl {
    author?: ReducedUser = new ReducedUserImpl();
    deleted?: boolean = false;
    issue?: ReducedIssue = new ReducedIssueImpl();
    attachments?: any = [];
    created?: number = 0;
    id?: string = '';
    text?: string = '';
    textPreview?: string = '';
    updated?: number = 0;
    usesMarkdown?: boolean = false;
    visibility?: any = null;
}

export interface IssueComment extends IssueCommentImpl {
}

export interface UpdateIssueComment extends IssueComment {
    id: string;
}