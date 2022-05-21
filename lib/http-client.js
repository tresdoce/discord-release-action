"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethods = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
var HttpMethods;
(function (HttpMethods) {
    HttpMethods["GET"] = "GET";
    HttpMethods["PUT"] = "PUT";
    HttpMethods["POST"] = "POST";
    HttpMethods["DELETE"] = "DELETE";
})(HttpMethods = exports.HttpMethods || (exports.HttpMethods = {}));
const headers = {
    'Content-Type': 'application/json',
    Accept: `application/vnd.iman.v1+json, application/json, text/plain, */*`,
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    Pragma: 'no-cache',
};
const filterOptions = (_a) => {
    var rest = __rest(_a, []);
    return rest;
};
const fetch = async (url, options = {}) => {
    try {
        const instance = axios_1.default.create(Object.assign({}, options));
        return await instance.request({
            url,
            data: options['data'],
            params: options['params'],
            method: options['method'],
            headers: options['headers'],
            httpsAgent: new https_1.default.Agent({
                rejectUnauthorized: false,
                requestCert: false,
            }),
        });
    }
    catch (error) {
        throw error;
    }
};
const get = async (url, options = {}) => {
    return fetch(url, Object.assign({ method: HttpMethods.GET, headers }, filterOptions(options)));
};
const post = async (url, options = {}) => {
    return fetch(url, Object.assign({ method: HttpMethods.POST, headers }, filterOptions(options)));
};
const put = async (url, options = {}) => {
    return fetch(url, Object.assign({ method: HttpMethods.PUT, headers }, filterOptions(options)));
};
const del = async (url, options = {}) => {
    return fetch(url, Object.assign({ method: HttpMethods.DELETE, headers }, filterOptions(options)));
};
exports.default = {
    get,
    post,
    put,
    delete: del,
};
//# sourceMappingURL=http-client.js.map