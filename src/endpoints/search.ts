import {BaseEndpoint} from "./base";
import {Search} from "..";

export namespace SearchPaths {
    export const saved: string = '/user/search';
}

export class SearchEndpoint extends BaseEndpoint {

    public saved(): Promise<Search[]> {
        return this.toPromise<Search[]>(this.client.get(SearchPaths.saved)).then(response => {
            return response;
        });
    }
}