export interface YoutrackOptions {
    baseUrl: string;
}

export interface YoutrackLoginOptions extends YoutrackOptions {
    login: string;
    password: string;
}

export interface YoutrackTokenOptions extends YoutrackOptions {
    token: string;
}

export function instanceOfYoutrackLoginOptions(object: any): object is YoutrackLoginOptions {
    return !!object && "login" in object && "password" in object;
}

export function instanceOfYoutrackTokenOptions(object: any): object is YoutrackTokenOptions {
    return !!object && "token" in object;
}