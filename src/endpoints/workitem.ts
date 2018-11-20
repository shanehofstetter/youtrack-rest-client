import xml = require("xml");
import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {headers} from "../config/headers";
import {WorkItem} from "..";

export class WorkItemEndpoint extends BaseEndpoint {

    public all(issueId: string): Promise<WorkItem[]> {
        return this.toPromise<WorkItem[]>(this.client.get(this.format(urls.WORK_ITEMS, {issueId}))).then(response => {
            return response;
        });
    }

    public create(issueId: string, workItem: WorkItem): Promise<string> {
        return this.toPromise(this.client.post(this.format(urls.WORK_ITEMS, {issueId}), {
            resolveWithFullResponse: true,
            body: this.workItemToXML(workItem),
            json: false
        }, headers.CONTENT_TYPE_XML)).then((response: any) => {
            const location = response.headers.location;
            return location.match(/\/workitem\/([\S\-]+)$/)[0].replace("/workitem/", "");
        });
    }

    public edit(issueId: string, workItem: WorkItem): Promise<string> {
        return this.toPromise(this.client.put(this.format(urls.WORK_ITEM, {issueId, workItemId: workItem.id}), {
            body: xml({
                workItem: [
                    {duration: workItem.duration},
                    {date: workItem.date},
                    {description: workItem.description},
                ]
            }),
            json: false
        }, headers.CONTENT_TYPE_XML));
    }

    public delete(issueId: string, workItemId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(urls.WORK_ITEM, {issueId, workItemId})));
    }

    private workItemToXML(workItem: WorkItem): string {
        return xml({
            workItem: [
                {duration: workItem.duration},
                {date: workItem.date},
                {description: workItem.description},
                {
                    worktype: [
                        {name: (workItem.worktype ? workItem.worktype.name : '')}
                    ]
                }
            ]
        });
    }
}
