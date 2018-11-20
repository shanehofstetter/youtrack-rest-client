export class CustomFieldDefaultsImpl {
    canBeEmpty: boolean = false;
    emptyFieldText: string = '';
    isPublic: boolean = false;
    id: string = '';
}

export interface CustomFieldDefaults extends CustomFieldDefaultsImpl {
}
