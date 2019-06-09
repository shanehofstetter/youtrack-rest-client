import { ReducedIssue, ReducedIssueImpl } from "./issue";

export class IssueLinkTypeImpl {
    id?: string = '';
    name?: string = '';
    sourceToTarget?: string = '';
    targetToSource?: string = '';
    directed?: boolean = false;
    aggregation?: boolean = false;
    readOnly?: boolean = false;
}

export interface IssueLinkType extends IssueLinkTypeImpl {

}

export class IssueLinkImpl {
    id: string = '';
    direction?: string = '';
    linkType?: IssueLinkType = new IssueLinkTypeImpl();
    issue?: ReducedIssue = new ReducedIssueImpl();
    issues: ReducedIssue[] = [new ReducedIssueImpl()];
}

export interface IssueLink extends IssueLinkImpl {
}