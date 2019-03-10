import { ReducedIssue, ReducedIssueImpl } from "./issue";
import { ReducedUserImpl, ReducedUser } from "./user";

export class DurationValueImpl {
    presentation?: string = '';
    id?: string = '';
    minutes?: number = 0;
}

export interface DurationValue extends DurationValueImpl {
}

export class WorkItemTypeImpl {
    id?: string = '';
    name?: string = '';
    autoAttached?: boolean = false;
}

export interface WorkItemType extends WorkItemTypeImpl {
}

export class WorkItemImpl {
    id?: string = '';
    created?: number = 0;
    date?: number = 0;
    duration?: DurationValue = new DurationValueImpl();
    issue?: ReducedIssue = new ReducedIssueImpl();
    updated?: number = 0;
    author?: ReducedUser = new ReducedUserImpl();
    creator?: ReducedUser = new ReducedUserImpl();
    text?: string = '';
    textPreview?: string = '';
    type?: WorkItemType = new WorkItemTypeImpl();
    usesMarkdown?: boolean = false;
}

export interface WorkItem extends WorkItemImpl {
}

export interface UpdateWorkItem extends WorkItemImpl {
    id: string;
}
