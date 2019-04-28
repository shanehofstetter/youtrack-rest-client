import { CustomField, CustomFieldImpl } from "./customField";

export class ProjectCustomFieldImpl {
    canBeEmpty: boolean = false;
    emptyFieldText: string = '';
    field: CustomField = new CustomFieldImpl();
    hasRunningJob: boolean = false;
    isPublic: boolean = false;
    ordinal: number = 0;
    id: string = '';
}

export interface ProjectCustomField extends ProjectCustomFieldImpl {

}
