import {urls} from "../config/urls";
import {BaseEndpoint} from "./base";

export interface Search {
    value: string;
    name: string;
    visibleForGroup: string;
    updatableByGroup: boolean;
}

export class SearchEndpoint extends BaseEndpoint {

    public saved(): Promise<Search[]> {
        return this.toPromise<Search[]>(this.client.get(urls.SAVED_SEARCHES)).then(response => {
            return response;
        });
    }
}