import { ReducedUserImpl, ReducedUser } from "./user";
import { ReducedIssue, ReducedIssueImpl } from "./issue";

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