import { CustomFieldDefaults, CustomFieldDefaultsImpl } from "./customFieldDefaults";

export class CustomFieldImpl {
    aliases: string = '';
    fieldDefaults: CustomFieldDefaults = new CustomFieldDefaultsImpl();
    hasRunningJob: boolean = false;
    isAutoAttached: boolean = false;
    isDisplayedInIssueList: boolean = false;
    isUpdateable: boolean = false;
    localizedName: string = '';
    name: string = '';
    ordinal: number = 0;
    id: string = '';
}

export interface CustomField extends CustomFieldImpl {
}
