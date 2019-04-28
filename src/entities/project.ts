import { ReducedUser, ReducedUserImpl } from "./user";
import { ProjectCustomField, ProjectCustomFieldImpl } from "./projectCustomField";

export class ReducedProjectImpl {
    id?: string = '';
    name?: string = '';
    shortName?: string = '';
    description?: string = '';
    archived?: boolean = false;
}

export class ProjectImpl extends ReducedProjectImpl {
    createdBy: ReducedUser = new ReducedUserImpl();
    fields: ProjectCustomField[] = [new ProjectCustomFieldImpl()];
    fromEmail: string = '';
    hubResourceId: string = '';
    iconUrl: string = '';
    timeTrackingEnabled?: boolean = false;
    leader?: ReducedUser = new ReducedUserImpl();
}

export interface Project extends ProjectImpl {
}

export interface ReducedProject extends ReducedProjectImpl {

}