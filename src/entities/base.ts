import {YoutrackClient} from "../youtrack";
import * as format from "string-template";
import {RequestPromise} from "request-promise";


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
            return Promise.reject(error.message);
        }));
    }
}