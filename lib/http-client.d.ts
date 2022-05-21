import { AxiosPromise } from 'axios';
export declare enum HttpMethods {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
}
declare const _default: {
    get: (url: string, options?: any) => Promise<AxiosPromise<any>>;
    post: (url: string, options?: any) => Promise<AxiosPromise<any>>;
    put: (url: string, options?: any) => Promise<AxiosPromise<any>>;
    delete: (url: string, options?: any) => Promise<AxiosPromise<any>>;
};
export default _default;
