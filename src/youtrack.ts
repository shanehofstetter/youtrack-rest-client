import {
    YoutrackTokenOptions
} from "./options/youtrack_options";
import {UserEndpoint} from "./endpoints/user";
import {TagEndpoint} from "./endpoints/tag";
import {IssueEndpoint} from "./endpoints/issue";
import {ProjectEndpoint} from "./endpoints/project";
import {AgileEndpoint} from "./endpoints/agile";
import {SprintEndpoint} from "./endpoints/sprint";
import {WorkItemEndpoint} from "./endpoints/workitem";
import {CommentEndpoint} from "./endpoints/comment";
import {axiosInstance} from "./axios";
import {AxiosRequestConfig} from "axios/index";
import {YoutrackClient} from "./youtrack_client";
import {GetRequestOptions, RequestOptions} from "./options/request_options";

export class Youtrack implements YoutrackClient {

    private readonly baseUrl: string;
    private defaultRequestOptions: RequestOptions = {};
    public readonly users: UserEndpoint;
    public readonly tags: TagEndpoint;
    public readonly issues: IssueEndpoint;
    public readonly projects: ProjectEndpoint;
    public readonly agiles: AgileEndpoint;
    public readonly sprints: SprintEndpoint;
    public readonly workItems: WorkItemEndpoint;
    public readonly comments: CommentEndpoint;

    public constructor(options: YoutrackTokenOptions) {
        this.defaultRequestOptions = {
            ...this.defaultRequestOptions,
            headers: {
                Authorization: `Bearer ${options.token}`
            }
        };
        this.baseUrl = this.formBaseUrl(options.baseUrl);
        this.users = new UserEndpoint(this);
        this.tags = new TagEndpoint(this);
        this.issues = new IssueEndpoint(this);
        this.projects = new ProjectEndpoint(this);
        this.agiles = new AgileEndpoint(this);
        this.sprints = new SprintEndpoint(this);
        this.workItems = new WorkItemEndpoint(this);
        this.comments = new CommentEndpoint(this);
    }

    public post(url: string, params: RequestOptions = {}, headers: {} = {}): Promise<any> {
        return axiosInstance({
            method: 'post',
            url: url,
            baseURL: this.baseUrl, ...this.prepareParams(params, headers)
        }).then((res) => res.data);
    }

    public get(url: string, params: GetRequestOptions = {}, headers = {}): Promise<any> {
        return axiosInstance({
            method: 'get',
            url: url,
            baseURL: this.baseUrl, ...this.prepareParams(params, headers)
        }).then((res) => res.data);
    }

    public delete(url: string, params: RequestOptions = {}, headers = {}): Promise<any> {
        return axiosInstance({
            method: 'delete',
            url: url,
            baseURL: this.baseUrl, ...this.prepareParams(params, headers)
        }).then((res) => res.data);
    }

    public put(url: string, params: RequestOptions = {}, headers = {}): Promise<any> {
        return axiosInstance({
            method: 'put',
            url: url,
            baseURL: this.baseUrl, ...this.prepareParams(params, headers)
        }).then((res) => res.data);
    }

    private formBaseUrl(baseUrl: string): string {
        if (baseUrl.match(/\/$/)) {
            baseUrl = baseUrl.slice(0, -1);
        }
        if (!baseUrl.match(/api$/i)) {
            baseUrl += "/api";
        }
        return baseUrl;
    }

    private prepareParams(params: RequestOptions, customHeaders: {}): AxiosRequestConfig {
        let headers = {...customHeaders};
        if (this.defaultRequestOptions.headers) {
            headers = {...headers, ...this.defaultRequestOptions.headers};
        }

        return {...params, headers: headers};
    }
}
