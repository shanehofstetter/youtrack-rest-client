import { ReducedIssue, ReducedIssueImpl } from "./issue";

export class CommandListImpl {
    id?: string = '';
    caret?: number = 0;
    commands?: any[] = [];
    comment?: string = '';
    issues?: ReducedIssue[] = [new ReducedIssueImpl()];
    query?: string = '';
    runAs?: string = '';
    silent?: boolean = false;
    suggestions?: any[] = [];
    usesMarkdown?: boolean = false;
    visibility?: any = null;
}

export interface CommandList extends CommandListImpl {
}

export interface Command extends CommandList {
    query: string;
    issues: { id: string }[];
}
