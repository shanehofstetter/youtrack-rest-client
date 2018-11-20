import {Tag} from "./tag";
import {Comment} from "./comment";

export interface Issue {
    id: string;
    entityId: string;
    field: Field[];
    comment: Comment[];
    tag: Tag[];
}

export interface NewIssue {
    project: string;
    summary: string;
    description?: string;
    permittedGroup?: string;
}

export interface Field {
    name: string;
    value: string | any[];
    valueId?: string | any[];
    color?: Color | null;
}

export interface Color {
    bg: string;
    fg: string;
}

export interface IssueFilterOptions {
    with?: string;
    max?: number;
    after?: number;
}

export interface IssueChanges {
    issue: Issue;
    change: IssueChange[];
}

export interface FieldChange {
    name: string;
    value: any;
    oldValue: any;
}

export interface IssueChange {
    field: FieldChange[];
    comment: Comment[];
}

export interface IssueCommand {
    command?: string;
    comment?: string;
    group?: string;
    disableNotifications?: boolean;
    runAs?: string;
}
