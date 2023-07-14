import { AxiosInstance } from 'axios';

export interface YoutrackOptions {
    baseUrl: string;
    axiosInstance?: AxiosInstance;
}

export interface YoutrackTokenOptions extends YoutrackOptions {
    token: string;
}
