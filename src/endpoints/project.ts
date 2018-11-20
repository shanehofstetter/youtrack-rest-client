import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {MinimalProjectImpl, Project, ProjectImpl, ReducedProject} from "..";
import {generateFieldsQuery} from "../entities/fields/utils";

export class ProjectEndpoint extends BaseEndpoint {

    private readonly minimalFields: string = generateFieldsQuery(new MinimalProjectImpl());
    private readonly fields: string = generateFieldsQuery(new ProjectImpl());

    public all(): Promise<ReducedProject[]> {
        return this.toPromise<ReducedProject[]>(this.client.get(urls.PROJECTS, {qs: {fields: this.minimalFields}}))
            .then(response => {
                return response;
            });
    }

    public byId(projectId: string): Promise<Project> {
        return this.toPromise<Project>(this.client.get(this.format(urls.PROJECT, {projectId}),
            {qs: {fields: this.fields}})).then(response => {
            return response;
        });
    }
}
