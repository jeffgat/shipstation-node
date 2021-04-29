export declare enum RequestMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE"
}
export interface IShipstationRequestOptions {
    url: string;
    country?: 'international' | 'canada';
    method?: RequestMethod;
    useBaseUrl?: boolean;
    data?: any;
}
export default class Shipstation {
    authorizationToken: string;
    authorizationTokenCanada: string;
    private baseUrl;
    constructor();
    request: ({ country, url, method, useBaseUrl, data, }: IShipstationRequestOptions) => Promise<import("axios").AxiosResponse<any>>;
}
