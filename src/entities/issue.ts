import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";
import {Tag} from "./tag";

export interface Issue {
    id: string;
    entityId: string;
    field: Field[];
    comment: Comment[];
    tag: Tag[];
}

export interface Field {
    name: string;
    value: string;
}

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

export interface IssueFilterOptions {
    with?: string;
    max?: number;
    after?: number;
}

export class IssueEndpoint extends BaseEndpoint {
    public byId(issueId: string): Promise<Issue[]> {
        return this.toPromise(this.client.get(this.format(urls.ISSUE, {issue: issueId})));
    }

    public search(filter: string, filterOptions: IssueFilterOptions = {}): Promise<Issue[]> {
        return this.toPromise(this.client.get(urls.ISSUE_SEARCH, {
            qs: {
                filter,
                ...filterOptions
            }
        })).then((issues: any) => {
            return <Issue[]>issues['issue'];
        });
    }

    public delete(issueId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(urls.ISSUE, {issue: issueId})));
    }
}
