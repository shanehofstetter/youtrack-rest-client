import {MinimalUser, MinimalUserImpl} from "./user";

export class ProjectImpl {
    createdBy: MinimalUser = new MinimalUserImpl();
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
    leader?: any = null;
}

export interface Project extends ProjectImpl {
}
