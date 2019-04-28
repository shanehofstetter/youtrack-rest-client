import { BaseEndpoint } from "./base";
import { WorkItem, WorkItemImpl } from "..";
import { PaginationOptions } from "../options/pagination_options";

export const WorkItemPaths = {
    workitems: '/issues/{issueId}/timeTracking/workItems',
    workitem: '/issues/{issueId}/timeTracking/workItems/{workItemId}'
};

export class WorkItemEndpoint extends BaseEndpoint {

    public all(issueId: string, paginationOptions: PaginationOptions = {}): Promise<WorkItem[]> {
        return this.getResourceWithFields<WorkItem[]>(this.format(WorkItemPaths.workitems, { issueId }), WorkItemImpl, { qs: paginationOptions });
    }

    public create(issueId: string, workItem: WorkItem): Promise<WorkItem> {
        return this.postResourceWithFields<WorkItem>(this.format(WorkItemPaths.workitems, { issueId }), WorkItemImpl, {
            body: workItem
        });
    }

    public update(issueId: string, workItem: WorkItem): Promise<WorkItem> {
        return this.postResourceWithFields<WorkItem>(this.format(WorkItemPaths.workitem, {
            issueId, workItemId: workItem.id
        }), WorkItemImpl, {
            body: workItem
        });
    }

    public delete(issueId: string, workItemId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(WorkItemPaths.workitem, {
            issueId, workItemId
        })));
    }
}
