import { ReducedProject, ReducedProjectImpl } from "./project";
import { ReducedUser, ReducedUserImpl } from "./user";
import { IssueTag, IssueTagImpl } from "./issueTag";
import { ProjectCustomField, ProjectCustomFieldImpl } from "./projectCustomField";
import { GenericObject } from "./fields/utils";

export class IssueCustomFieldImpl {
    id: string = '';
    projectCustomField?: ProjectCustomField = new ProjectCustomFieldImpl();
    value: GenericObject | null = null;
    $type: string = '';
}

export interface IssueCustomField extends IssueCustomFieldImpl {
}

export class ReducedIssueImpl {
    id?: string = '';
    numberInProject?: number = 0;
    created?: number = 0;
    updated?: number = 0;
    project?: ReducedProject = new ReducedProjectImpl();
    summary?: string = '';
    description?: string = '';
}

export class IssueImpl extends ReducedIssueImpl {
    reporter?: ReducedUser = new ReducedUserImpl();
    updater?: ReducedUser = new ReducedUserImpl();
    wikifiedDescription?: string;
    usesMarkdown?: boolean = false;
    fields?: IssueCustomField[] = [new IssueCustomFieldImpl()];
    isDraft?: boolean = false;
    tags?: IssueTag[] = [new IssueTagImpl()];
}

export interface Issue extends IssueImpl {
}

export interface ReducedIssue extends ReducedIssueImpl {
}

export interface NewIssue extends Issue {
    project: { id: string };
    summary: string;
}

export interface UpdateIssue extends Issue {
    id: string;
}
