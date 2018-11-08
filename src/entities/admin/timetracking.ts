import {BaseEndpoint} from "../base";

interface TimeTrackingSettings {
    hoursADay: number;
    daysAWeek: number;

    [key: string]: any;
}

export class TimetrackingEndpoint extends BaseEndpoint {
    public get(): Promise<TimeTrackingSettings> {
        return this.toPromise<TimeTrackingSettings>(this.client.get('/admin/timetracking')).then(response => {
            return response;
        });
    }
}