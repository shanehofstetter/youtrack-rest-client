import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {ReducedProjectImpl, Project, ProjectImpl, ReducedProject} from "..";

export class ProjectEndpoint extends BaseEndpoint {

    public all(): Promise<ReducedProject[]> {
        return this.getResourceWithFields<ReducedProject[]>(urls.PROJECTS, ReducedProjectImpl);
    }

    public byId(projectId: string): Promise<Project> {
        return this.getResourceWithFields<Project>(this.format(urls.PROJECT, {projectId}), ProjectImpl);
    }
}
