import {YoutrackClient} from "../youtrack";
import {urls} from "../config/urls";

export interface Search {
    value: string;
    name: string;
    visibleForGroup: string;
    updatableByGroup: boolean;
}

export class SearchEndpoint {
    public constructor(private client: YoutrackClient) {
    }

    public saved(): Promise<Search[]> {
        return Promise.resolve(this.client.get(urls.SAVED_SEARCHES).then(response => {
            return response;
        }).catch(error => {
            console.error(error.message);
            throw new Error(error);
        }));
    }
}