import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";

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

export class ProjectEndpoint extends BaseEndpoint {

    public all(): Promise<Project[]> {
        return this.toPromise<Project[]>(this.client.get(urls.PROJECTS, {qs: {fields: projectFields.join(',')}})).then(response => {
            return response;
        });
    }

    public byId(projectId: string): Promise<Project> {
        return this.toPromise<Project>(this.client.get(this.format(urls.PROJECT, {projectId}),
            {qs: {fields: projectFields.join(',')}})).then(response => {
            return response;
        });
    }
}