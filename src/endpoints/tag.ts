import {BaseEndpoint} from "./base";
import {urls} from "../config/urls";
import {Tag} from "..";

export class TagEndpoint extends BaseEndpoint {

    public all(): Promise<Tag[]> {
        return this.toPromise<Tag[]>(this.client.get(urls.TAGS)).then(response => {
            return response;
        });
    }
}