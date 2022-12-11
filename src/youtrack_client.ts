import {UserEndpoint} from "./endpoints/user";
import {TagEndpoint} from "./endpoints/tag";
import {IssueEndpoint} from "./endpoints/issue";
import {ProjectEndpoint} from "./endpoints/project";
import {AgileEndpoint} from "./endpoints/agile";
import {SprintEndpoint} from "./endpoints/sprint";
import {WorkItemEndpoint} from "./endpoints/workitem";
import {CommentEndpoint} from "./endpoints/comment";
import {GetRequestOptions, RequestOptions} from "./options/request_options";

export interface YoutrackClient {

    get(url: string, params?: GetRequestOptions, headers?: {}): Promise<any>;

    post(url: string, params?: RequestOptions, headers?: {}): Promise<any>;

    delete(url: string, params?: RequestOptions, headers?: {}): Promise<any>;

    put(url: string, params?: RequestOptions, headers?: {}): Promise<any>;

    readonly users: UserEndpoint;
    readonly tags: TagEndpoint;
    readonly issues: IssueEndpoint;
    readonly projects: ProjectEndpoint;
    readonly agiles: AgileEndpoint;
    readonly sprints: SprintEndpoint;
    readonly workItems: WorkItemEndpoint;
    readonly comments: CommentEndpoint;
}
