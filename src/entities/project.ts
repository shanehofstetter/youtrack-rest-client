import {MinimalUser, MinimalUserImpl} from "./user";
import {ProjectCustomField, ProjectCustomFieldImpl} from "./projectCustomField";

export class MinimalProjectImpl {
    id: string = '';
    name: string = '';
    shortName?: string = '';
    description: string = '';
    archived?: boolean = false;
}

export class ProjectImpl extends MinimalProjectImpl {
    createdBy: MinimalUser = new MinimalUserImpl();
    fields: ProjectCustomField[] = [new ProjectCustomFieldImpl()];
    fromEmail: string = '';
    hubResourceId: string = '';
    iconUrl: string = '';
    timeTrackingEnabled?: boolean = false;
    leader?: MinimalUser = new MinimalUserImpl();
}

export interface Project extends ProjectImpl {
}

export interface ReducedProject extends MinimalProjectImpl {

}