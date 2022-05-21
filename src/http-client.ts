import axios, { AxiosPromise } from 'axios';
import https from 'https';

export enum HttpMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

const headers = {
  'Content-Type': 'application/json',
  Accept: `application/vnd.iman.v1+json, application/json, text/plain, */*`,
  //'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

const filterOptions = ({ ...rest }) => rest;

const fetch = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  try {
    const instance = axios.create({ ...options });

    return await instance.request({
      url,
      data: options['data'],
      params: options['params'],
      method: options['method'],
      headers: options['headers'],
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false,
      }),
    });
  } catch (error) {
    throw error;
  }
};

const get = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  return fetch(url, {
    method: HttpMethods.GET,
    headers,
    ...filterOptions(options),
  });
};

const post = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  return fetch(url, {
    method: HttpMethods.POST,
    headers,
    ...filterOptions(options),
  });
};

const put = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  return fetch(url, {
    method: HttpMethods.PUT,
    headers,
    ...filterOptions(options),
  });
};

const del = async (url: string, options: any = {}): Promise<AxiosPromise> => {
  return fetch(url, {
    method: HttpMethods.DELETE,
    headers,
    ...filterOptions(options),
  });
};

export default {
  get,
  post,
  put,
  delete: del,
};
