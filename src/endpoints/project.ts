import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {Project, projectFields} from "..";

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