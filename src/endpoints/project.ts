import {BaseEndpoint} from "./base";
import {ReducedProjectImpl, Project, ProjectImpl, ReducedProject} from "..";

export namespace ProjectPaths {
    export const projects = '/admin/projects';
    export const project = '/admin/projects/{projectId}';
}

export class ProjectEndpoint extends BaseEndpoint {

    public all(): Promise<ReducedProject[]> {
        return this.getResourceWithFields<ReducedProject[]>(ProjectPaths.projects, ReducedProjectImpl);
    }

    public byId(projectId: string): Promise<Project> {
        return this.getResourceWithFields<Project>(this.format(ProjectPaths.project, {projectId}), ProjectImpl);
    }
}
