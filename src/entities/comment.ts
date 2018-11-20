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
