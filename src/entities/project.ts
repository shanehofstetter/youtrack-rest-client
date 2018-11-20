export interface Value {
    value: string;
}

class ProjectImpl {
    createdBy: any = null;
    fields: any[] = [];
    fromEmail: string = '';
    hubResourceId: string = '';
    iconUrl: string = '';
    issues: any[] = [];
    id?: string = '';
    name: string = '';
    shortName?: string = '';
    description: string = '';
    archived?: boolean = false;
    usages?: any[] = [];
    timeTrackingEnabled?: boolean = false;
    query?: string = '';
    leader?: any = null;
}

export interface Project extends ProjectImpl {
}

export const projectFields: string[] = Object.getOwnPropertyNames(new ProjectImpl());
