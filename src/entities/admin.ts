import {BaseEndpoint} from "./base";
import {TimetrackingEndpoint} from "./admin/timetracking";
import {YoutrackClient} from "../youtrack";

export class AdminEndpoint extends BaseEndpoint {
    public readonly timetracking: TimetrackingEndpoint;

    public constructor(protected client: YoutrackClient) {
        super(client);
        this.timetracking = new TimetrackingEndpoint(this.client);
    }
}
