import {
    instanceOfYoutrackLoginOptions,
    instanceOfYoutrackTokenOptions,
    YoutrackLoginOptions,
    YoutrackTokenOptions
} from "./options/youtrack_options";
import * as request from "request-promise";
import {urls} from "./config/urls";
import {RequestPromise} from "request-promise";
import {UserEndpoint} from "./entities/user";
import {SearchEndpoint} from "./entities/search";
import {TagEndpoint} from "./entities/tag";
import {IssueEndpoint} from "./entities/issue";
import {ProjectEndpoint} from "./entities/project";
import {WorkItemEndpoint} from "./entities/workItem";

export interface YoutrackClient {

    login(): Promise<any>;

    get(url: string, params?: {}, headers?: {}): RequestPromise;

    post(url: string, params?: {}, headers?: {}): RequestPromise;

    delete(url: string, params?: {}, headers?: {}): RequestPromise;

    put(url: string, params?: {}, headers?: {}): RequestPromise;

    readonly users: UserEndpoint;
    readonly searches: SearchEndpoint;
    readonly tags: TagEndpoint;
    readonly issues: IssueEndpoint;
    readonly projects: ProjectEndpoint;
    readonly workItems: WorkItemEndpoint;
}

interface RequestOptions {
    [key: string]: any;
}

export class Youtrack implements YoutrackClient {

    private loggedIn: boolean = false;
    private readonly baseUrl: string;
    private defaultRequestOptions: RequestOptions = {jar: true, json: true};
    private credentials: YoutrackLoginOptions | YoutrackTokenOptions | null = null;
    public readonly users: UserEndpoint;
    public readonly searches: SearchEndpoint;
    public readonly tags: TagEndpoint;
    public readonly issues: IssueEndpoint;
    public readonly projects: ProjectEndpoint;
    public readonly workItems: WorkItemEndpoint;

    public constructor(options: YoutrackLoginOptions | YoutrackTokenOptions) {
        if (instanceOfYoutrackTokenOptions(options)) {
            this.defaultRequestOptions = {
                ...this.defaultRequestOptions,
                headers: {
                    Authorization: `Bearer ${options.token}`
                }
            };
        } else {
            this.credentials = options;
        }
        this.baseUrl = this.formBaseUrl(options.baseUrl);
        this.users = new UserEndpoint(this);
        this.searches = new SearchEndpoint(this);
        this.tags = new TagEndpoint(this);
        this.issues = new IssueEndpoint(this);
        this.projects = new ProjectEndpoint(this);
        this.workItems = new WorkItemEndpoint(this);
    }

    public login(): Promise<YoutrackClient> {
        if (instanceOfYoutrackLoginOptions(this.credentials)) {
            return this.performLogin(this.credentials).then(() => {
                return this;
            });
        }
        return Promise.resolve(this);
    }

    public post(url: string, params = {}, headers: {} = {}): RequestPromise {
        return request.post(this.baseUrl + url, this.prepareParams(params, headers));
    }

    public get(url: string, params = {}, headers = {}): RequestPromise {
        return request.get(this.baseUrl + url, this.prepareParams(params, headers));
    }

    public delete(url: string, params = {}, headers = {}): RequestPromise {
        return request.delete(this.baseUrl + url, this.prepareParams(params, headers));
    }

    public put(url: string, params = {}, headers = {}): RequestPromise {
        return request.put(this.baseUrl + url, this.prepareParams(params, headers));
    }

    private formBaseUrl(baseUrl: string): string {
        if (baseUrl.match(/\/$/)) {
            baseUrl = baseUrl.slice(0, -1);
        }
        if (!baseUrl.match(/rest$/i)) {
            baseUrl += "/rest";
        }
        return baseUrl;
    }

    private performLogin(credentials: YoutrackLoginOptions) {
        return Promise.resolve(this.post(urls.USER_LOGIN, {
            form: {
                login: credentials.login,
                password: credentials.password
            }
        }).then(response => {
            this.loggedIn = true;
        }).catch(error => {
            throw new Error(error);
        }));
    }

    private prepareParams(params: {}, customHeaders: {}): {} {
        if ('headers' in this.defaultRequestOptions && Object.keys(customHeaders).length > 0) {
            // merge the header parameters
            const {headers, ...defaultOptions} = this.defaultRequestOptions;
            return {...defaultOptions, ...params, headers: {...headers, ...customHeaders}};
        }
        return {...this.defaultRequestOptions, ...params, customHeaders}
    }
}
