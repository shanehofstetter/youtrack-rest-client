import { ReducedAgile, ReducedAgileImpl } from "./agile";
import { ReducedIssue, ReducedIssueImpl } from "./issue"

export class ReducedSprintImpl {
    id?: string = '';
    name?: string = '';
    goal?: string = '';
    start?: number = 0;
    finish?: number = 0;
    archived?: boolean = false;
    unresolvedIssuesCount?: number = 0;
    previousSprint?: ReducedSprint = undefined;
}

export class SprintImpl extends ReducedSprintImpl {
    agile?: ReducedAgile = new ReducedAgileImpl();
    issues: ReducedIssue[] = [new ReducedIssueImpl()];
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
