export interface Author {
    login: string;
    ringId: string;
    url: string;
}

export interface WorkType {
    name: string;
    id?: string;
    autoAttached?: boolean;
    url?: string;
}

export interface WorkItem {
    id?: string;
    duration: number;
    /**
     * the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this date
     */
    date: number;
    /**
     * the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this date
     */
    created?: number;
    description: string;
    author?: Author;
    worktype?: WorkType;
}
