import * as format from "string-template";
import {generateFieldsQuery, GenericObject} from "../entities/fields/utils";
import {GetRequestOptions, RequestOptions} from "../options/request_options";
import {YoutrackClient} from "../youtrack_client";

export class BaseEndpoint {
    public constructor(protected client: YoutrackClient) {
    }

    protected format(template: string, values: {}): string {
        return format(template, values);
    }

    protected toPromise<T>(request: Promise<any>): Promise<T> {
        return Promise.resolve(request.then((response) => response)
            .catch(error => Promise.reject(error)));
    }

    protected getResource<T>(url: string, params: GetRequestOptions = {}): Promise<T> {
        return this.toPromise<T>(this.client.get(url, params));
    }

    protected postResource<T>(url: string, params: RequestOptions = {}): Promise<T> {
        return this.toPromise<T>(this.client.post(url, params));
    }

    protected getResourceWithFields<T>(url: string, implementation: new () => object, options: GetRequestOptions = {}): Promise<T> {
        return this.getResource(url, {
            params: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.params || {})
            }
        })
    }

    protected postResourceWithFields<T>(url: string, implementation: new () => object, options: RequestOptions = {}): Promise<T> {
        return this.postResource(url, {
            ...options,
            data: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.params || {})
            }
        })
    }
}
