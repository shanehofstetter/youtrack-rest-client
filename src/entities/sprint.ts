import { ReducedAgile, ReducedAgileImpl } from "./agile";
import { ReducedIssue, ReducedIssueImpl, Issue, IssueImpl } from "./issue"

export class ReducedSprintImpl {
    id?: string = '';
    name?: string = '';
    goal?: string = '';
    start?: number = 0;
    finish?: number = 0;
    archived: boolean = false;
    agile?: ReducedAgile = new ReducedAgileImpl();
    issues: ReducedIssue[] = [new ReducedIssueImpl()];
    unresolvedIssuesCount: number = 0;
    previousSprint?: ReducedSprint = undefined;
}

export class SprintImpl extends ReducedSprintImpl {
    issues: Issue[] = [new IssueImpl()];
    isDefault: boolean = false;
}

export interface ReducedSprint extends ReducedSprintImpl {
}

export interface Sprint extends SprintImpl {
}

export interface NewSprint extends Sprint {
    name: string;
}

export interface UpdateSprint extends Sprint {
    id: string;
}