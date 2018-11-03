import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";

export interface Value {
    value: string;
}

export interface Project {
    id?: string;
    name: string;
    shortName?: string;
    description: string;
    isImporting?: boolean;
    archived?: boolean;
    lead?: string;
    startingNumber?: any;
    subsystems?: any[];
    assigneesLogin?: Value[];
    assigneesFullName?: Value[];
    assigneesUrl?: string;
    subsystemsUrl?: string;
    buildsUrl?: string;
    versionsUrl?: string;
}

export class ProjectEndpoint extends BaseEndpoint {

    public all(): Promise<Project[]> {
        return this.toPromise<Project[]>(this.client.get(urls.PROJECTS, {qs: {verbose: 'true'}})).then(response => {
            return response;
        });
    }

    public byId(projectId: string): Promise<Project> {
        return this.toPromise<Project>(this.client.get(this.format(urls.PROJECT, {projectId}))).then(response => {
            return response;
        });
    }
}