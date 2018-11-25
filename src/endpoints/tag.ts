import {BaseEndpoint} from "./base";
import {Tag} from "..";

export namespace TagPaths {
    export const tags = '/user/tag';
}

export class TagEndpoint extends BaseEndpoint {

    public all(): Promise<Tag[]> {
        return this.toPromise<Tag[]>(this.client.get(TagPaths.tags)).then(response => {
            return response;
        });
    }
}