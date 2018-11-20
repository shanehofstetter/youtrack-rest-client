import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {Issue, IssueChanges, IssueCommand, IssueFilterOptions, NewIssue} from "..";

export class IssueEndpoint extends BaseEndpoint {
    public byId(issueId: string): Promise<Issue> {
        return this.toPromise(this.client.get(this.format(urls.ISSUE, {issue: issueId})));
    }

    public search(filter: string, filterOptions: IssueFilterOptions = {}): Promise<Issue[]> {
        return this.toPromise(this.client.get(urls.ISSUES, {
            qs: {
                filter,
                ...filterOptions
            }
        })).then((issues: any) => {
            return <Issue[]>issues.issue;
        });
    }

    public delete(issueId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(urls.ISSUE, {issue: issueId})));
    }

    public create(issue: NewIssue): Promise<string> {
        return this.toPromise(this.client.put(urls.ISSUES, {
            qs: issue,
            resolveWithFullResponse: true
        })).then((response: any) => {
            const location = response.headers.location;
            return location.match(/\/issue\/([\S\-]+)$/)[0].replace("/issue/", "");
        });
    }

    public history(issueId: string): Promise<Issue[]> {
        return this.toPromise<Issue[]>(this.client.get(this.format(urls.ISSUE_HISTORY, {issue: issueId})));
    }

    public changes(issueId: string): Promise<IssueChanges> {
        return this.toPromise<IssueChanges>(this.client.get(this.format(urls.ISSUE_CHANGES, {issue: issueId})));
    }

    public exists(issueId: string): Promise<boolean> {
        return Promise.resolve(this.client.get(this.format(urls.ISSUE_EXISTS, {issue: issueId})).then(() => {
            return Promise.resolve(true);
        }).catch(() => Promise.resolve(false)));
    }

    public execute(issueId: string, issueCommand: IssueCommand): Promise<any> {
        return this.toPromise(this.client.post(this.format(urls.ISSUE_EXECUTE, {issue: issueId}), {
            form: issueCommand
        }));
    }
}