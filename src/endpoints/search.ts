import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {Search} from "..";

export class SearchEndpoint extends BaseEndpoint {

    public saved(): Promise<Search[]> {
        return this.toPromise<Search[]>(this.client.get(urls.SAVED_SEARCHES)).then(response => {
            return response;
        });
    }
}