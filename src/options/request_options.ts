import {AxiosRequestConfig} from "axios";

export interface RequestOptions extends Pick<AxiosRequestConfig, "headers" | "params" | "data"> {
}

export interface GetRequestOptions extends Pick<RequestOptions, "headers" | "params"> {
}
