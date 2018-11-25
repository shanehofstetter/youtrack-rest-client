import {BaseEndpoint} from "./base";
import {Issue, IssueChanges, IssueCommand, IssueFilterOptions, NewIssue} from "..";

export namespace IssuePaths {
    export const issue = '/issue/{issue}';
    export const issues = '/issue';
    export const execute = '/issue/{issue}/execute';
    export const exists = '/issue/{issue}/exists';
    export const history = '/issue/{issue}/history';
    export const changes = '/issue/{issue}/changes';
}

export class IssueEndpoint extends BaseEndpoint {

    public byId(issueId: string): Promise<Issue> {
        return this.toPromise(this.client.get(this.format(IssuePaths.issue, {issue: issueId})));
    }

    public search(filter: string, filterOptions: IssueFilterOptions = {}): Promise<Issue[]> {
        return this.toPromise(this.client.get(IssuePaths.issues, {
            qs: {
                filter,
                ...filterOptions
            }
        })).then((issues: any) => {
            return <Issue[]>issues.issue;
        });
    }

    public delete(issueId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(IssuePaths.issue, {issue: issueId})));
    }

    public create(issue: NewIssue): Promise<string> {
        return this.toPromise(this.client.put(IssuePaths.issues, {
            qs: issue,
            resolveWithFullResponse: true
        })).then((response: any) => {
            const location = response.headers.location;
            return location.match(/\/issue\/([\S\-]+)$/)[0].replace("/issue/", "");
        });
    }

    public history(issueId: string): Promise<Issue[]> {
        return this.toPromise<Issue[]>(this.client.get(this.format(IssuePaths.history, {issue: issueId})));
    }

    public changes(issueId: string): Promise<IssueChanges> {
        return this.toPromise<IssueChanges>(this.client.get(this.format(IssuePaths.changes, {issue: issueId})));
    }

    public exists(issueId: string): Promise<boolean> {
        return Promise.resolve(this.client.get(this.format(IssuePaths.exists, {issue: issueId})).then(() => {
            return Promise.resolve(true);
        }).catch(() => Promise.resolve(false)));
    }

    public execute(issueId: string, issueCommand: IssueCommand): Promise<any> {
        return this.toPromise(this.client.post(this.format(IssuePaths.execute, {issue: issueId}), {
            form: issueCommand
        }));
    }
}