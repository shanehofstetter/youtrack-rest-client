import { BaseEndpoint } from "./base";
import { ReducedProjectImpl, Project, ProjectImpl, ReducedProject } from "..";
import { WorkItemTypeImpl } from "../entities/workItem";

export const ProjectPaths = {
    projects: '/admin/projects',
    project: '/admin/projects/{projectId}',
    workItemTypes: '/admin/projects/{projectId}/timeTrackingSettings/workItemTypes'
};

export class ProjectEndpoint extends BaseEndpoint {

    public all(): Promise<ReducedProject[]> {
        return this.getResourceWithFields<ReducedProject[]>(ProjectPaths.projects, ReducedProjectImpl);
    }

    public byId(projectId: string): Promise<Project> {
        return this.getResourceWithFields<Project>(this.format(ProjectPaths.project, { projectId }), ProjectImpl);
    }

    public getWorkItemTypes(projectId: string): Promise<WorkItemTypeImpl[]> {
        return this.getResourceWithFields<WorkItemTypeImpl[]>(this.format(ProjectPaths.workItemTypes, { projectId }), WorkItemTypeImpl);
    }
}
