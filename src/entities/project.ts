import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";

export interface Value {
    value: string;
}

export interface Project {
    name: string;
    shortName: string;
    description: string;
    isImporting: boolean;
    subsystems: any[];
    assigneesLogin: Value[];
    assigneesFullName: Value[];
}

export class ProjectEndpoint extends BaseEndpoint {

    public all(): Promise<Project[]> {
        return this.toPromise<Project[]>(this.client.get(urls.PROJECTS, {qs: {verbose: 'true'}})).then(response => {
            return response;
        });
    }
}