import { BaseEndpoint } from "./base";
import { ReducedProjectImpl, Project, ProjectImpl, ReducedProject } from "..";
import { WorkItemTypeImpl } from "../entities/workItem";
import { PaginationOptions } from "../options/pagination_options";

export const ProjectPaths = {
    projects: '/admin/projects',
    project: '/admin/projects/{projectId}',
    workItemTypes: '/admin/projects/{projectId}/timeTrackingSettings/workItemTypes'
};

export class ProjectEndpoint extends BaseEndpoint {

    public all(paginationOptions: PaginationOptions = {}): Promise<ReducedProject[]> {
        return this.getResourceWithFields<ReducedProject[]>(ProjectPaths.projects, ReducedProjectImpl, { qs: paginationOptions });
    }

    public byId(projectId: string): Promise<Project> {
        return this.getResourceWithFields<Project>(this.format(ProjectPaths.project, { projectId }), ProjectImpl);
    }

    public getWorkItemTypes(projectId: string): Promise<WorkItemTypeImpl[]> {
        return this.getResourceWithFields<WorkItemTypeImpl[]>(this.format(ProjectPaths.workItemTypes, { projectId }), WorkItemTypeImpl);
    }
}
