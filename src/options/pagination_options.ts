export interface PaginationOptions {
    /**
     * Optional. Lets you set a number of returned entities to skip before returning the first one.
     */
    $skip?: number;
    /**
     * Optional. Lets you specify the maximum number of entries that are returned in the response.
     */
    $top?: number;
}