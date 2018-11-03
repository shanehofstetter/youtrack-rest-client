import {instanceOfYoutrackLoginOptions, YoutrackLoginOptions, YoutrackTokenOptions} from "./options/youtrack_options";
import * as request from "request-promise";
import {urls} from "./config/urls";
import {RequestPromise} from "request-promise";
import {UserEndpoint} from "./entities/user";
import {SearchEndpoint} from "./entities/search";
import {TagEndpoint} from "./entities/tag";

export interface YoutrackClient {

    login(): Promise<any>;

    get(url: string, params?: {}): RequestPromise;

    post(url: string, params?: {}): RequestPromise;

    readonly users: UserEndpoint;
    readonly searches: SearchEndpoint;
    readonly tags: TagEndpoint;
}

export class Youtrack implements YoutrackClient {

    private loggedIn: boolean = false;
    private readonly baseUrl: string;
    private defaultRequestOptions: object = {jar: true, json: true};
    private credentials: YoutrackLoginOptions | YoutrackTokenOptions;
    public readonly users: UserEndpoint;
    public readonly searches: SearchEndpoint;
    public readonly tags: TagEndpoint;

    public constructor(options: YoutrackLoginOptions | YoutrackTokenOptions) {
        if (!instanceOfYoutrackLoginOptions(options)) {
            throw new Error("token login not supported at the moment");
        }
        this.credentials = options;
        this.baseUrl = this.formBaseUrl(options.baseUrl);
        this.users = new UserEndpoint(this);
        this.searches = new SearchEndpoint(this);
        this.tags = new TagEndpoint(this);
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

    public login(): Promise<any> {
        if (instanceOfYoutrackLoginOptions(this.credentials)) {
            return this.performLogin(this.credentials);
        }
        return Promise.resolve(null);
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

    public post(url: string, params: {} = {}): RequestPromise {
        return request.post(this.baseUrl + url, {...params, ...this.defaultRequestOptions});
    }

    public get(url: string, params: {} = {}): RequestPromise {
        return request.get(this.baseUrl + url, {...params, ...this.defaultRequestOptions});
    }
}
