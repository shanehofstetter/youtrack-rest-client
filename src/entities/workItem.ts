import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";
import xml = require("xml");
import {headers} from "../config/headers";

export interface Author {
    login: string;
    ringId: string;
    url: string;
}

export interface WorkType {
    name: string;
    id?: string;
    autoAttached?: boolean;
    url?: string;
}

export interface WorkItem {
    id?: string;
    duration: number;
    /**
     * the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this date
     */
    date: number;
    /**
     * the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this date
     */
    created?: number;
    description: string;
    author?: Author;
    workType: WorkType;
}

export class WorkItemEndpoint extends BaseEndpoint {

    public all(issueId: string): Promise<WorkItem[]> {
        return this.toPromise<WorkItem[]>(this.client.get(this.format(urls.WORK_ITEM, {issueId}))).then(response => {
            return response;
        });
    }

    public create(issueId: string, workItem: WorkItem): Promise<string> {
        return this.toPromise(this.client.post(this.format(urls.WORK_ITEM, {issueId}), {
            resolveWithFullResponse: true,
            body: this.workItemToXML(workItem),
            json: false
        }, headers.CONTENT_TYPE_XML)).then((response: any) => {
            const location = response.headers.location;
            return location.match(/\/workitem\/([\S\-]+)$/)[0].replace("/workitem/", "");
        });
    }

    private workItemToXML(workItem: WorkItem): string {
        const workItemPayload = (({duration, date, description, workType}) => ({
            workItem: [
                {duration},
                {date},
                {description},
                {
                    worktype: [
                        {name: workType.name}
                    ]
                }
            ]
        }))(workItem);
        return xml(workItemPayload);
    }
}
