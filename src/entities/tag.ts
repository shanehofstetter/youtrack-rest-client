import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";

export interface Tag {
    name: string;
    visibleForGroup: string;
    updatableByGroup: boolean;
    untagOnResolve: boolean;
}

export class TagEndpoint extends BaseEndpoint {

    public all(): Promise<Tag[]> {
        return this.toPromise<Tag[]>(this.client.get(urls.TAGS)).then(response => {
            return response;
        });
    }
}