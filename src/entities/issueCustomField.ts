import { FieldStyle, FieldStyleImpl } from "./fieldStyle";
import { ProjectCustomField, ProjectCustomFieldImpl } from "./projectCustomField";

export class IssueCustomFieldValueImpl {
    id?: string = '';
    name?: string = '';
    localizedName?: string = '';
    fullName?: string = '';
    login?: string = '';
    avatarUrl?: string = '';
    isResolved?: boolean = false;
    color?: FieldStyle = new FieldStyleImpl();
    text?: string = '';
}

export interface IssueCustomFieldValue extends IssueCustomFieldValueImpl {
}

export class IssueCustomFieldImpl {
    id: string = '';
    projectCustomField?: ProjectCustomField = new ProjectCustomFieldImpl();
    value: IssueCustomFieldValue | null = new IssueCustomFieldValueImpl();
    $type: string = '';
    name: string = '';
}

export interface IssueCustomField extends IssueCustomFieldImpl {
}
