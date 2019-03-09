import { YoutrackClient } from "../youtrack";
import * as format from "string-template";
import { RequestPromise } from "request-promise";
import { generateFieldsQuery, GenericObject } from "../entities/fields/utils";

export class BaseEndpoint {
    public constructor(protected client: YoutrackClient) {
    }

    protected format(template: string, values: {}): string {
        return format(template, values);
    }

    protected toPromise<T>(request: RequestPromise): Promise<T> {
        return Promise.resolve(request.then(response => {
            return response;
        }).catch(error => {
            return Promise.reject(error);
        }));
    }

    protected getResource<T>(url: string, params = {}): Promise<T> {
        return this.toPromise<T>(this.client.get(url, params));
    }

    protected postResource<T>(url: string, params = {}): Promise<T> {
        return this.toPromise<T>(this.client.post(url, params));
    }

    protected getResourceWithFields<T>(url: string, implementation: new () => object, options: { qs?: GenericObject } = {}): Promise<T> {
        return this.getResource(url, {
            qs: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.qs || {})
            }
        })
    }

    protected postResourceWithFields<T>(url: string, implementation: new () => object, options: {
        qs?: GenericObject,
        body?: any,
        form?: any
    } = {}): Promise<T> {
        return this.postResource(url, {
            ...options,
            qs: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.qs || {})
            }
        })
    }
}
