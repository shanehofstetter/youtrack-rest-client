import {YoutrackClient} from "../youtrack";
import {urls} from "../config/urls";

export interface Tag {
    name: string;
    visibleForGroup: string;
    updatableByGroup: boolean;
    untagOnResolve: boolean;
}

export class TagEndpoint {
    public constructor(private client: YoutrackClient) {
    }

    public all(): Promise<Tag[]> {
        return Promise.resolve(this.client.get(urls.TAGS).then(response => {
            return response;
        }).catch(error => {
            console.error(error.message);
            throw new Error(error);
        }));
    }
}