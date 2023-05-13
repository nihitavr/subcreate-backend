import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosInstance } from 'axios';

export type KeyValuePair = { [key: string]: string | undefined };

export interface RequestParams {
  body?: any;
  queryParams?: KeyValuePair;
  headers?: KeyValuePair;
}

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export interface retryConfig {
  retries: number;
  retryCondition: (error: AxiosError) => boolean;
}

export class HTTPFetcher {
  private axios: AxiosInstance;

  constructor(
    readonly httpService: HttpService,
    private readonly baseUrl: string,
  ) {
    this.axios = this.httpService.axiosRef;
  }

  private async requestBuilder(
    url: string,
    method: string,
    requestParams?: RequestParams,
  ) {
    const headers = {
      ...requestParams?.headers,
      ...defaultHeaders,
    };

    return await this.axios.request({
      baseURL: this.baseUrl,
      url: url,
      responseType: 'json',
      method: method,
      params: requestParams?.queryParams,
      data: requestParams?.body,
      headers: headers,
      timeout: 12000,
      timeoutErrorMessage: 'Connection timeout.',
    });
  }

  async post(uri: string, requestParams?: RequestParams) {
    try {
      const httpResponse = await this.requestBuilder(
        uri,
        'POST',
        requestParams,
      );
      return httpResponse.data;
    } catch (err) {
      throw err;
    }
  }

  async get(uri: string, requestParams?: RequestParams) {
    try {
      const httpResponse = await this.requestBuilder(uri, 'GET', requestParams);
      return httpResponse.data;
    } catch (err) {
      throw err;
    }
  }

  async put(uri: string, requestParams?: RequestParams) {
    try {
      const httpResponse = await this.requestBuilder(uri, 'PUT', requestParams);
      return httpResponse.data;
    } catch (err) {
      throw err;
    }
  }

  async patch(uri: string, requestParams?: RequestParams) {
    try {
      const httpResponse = await this.requestBuilder(
        uri,
        'PATCH',
        requestParams,
      );
      return httpResponse.data;
    } catch (err) {
      throw err;
    }
  }

  async delete(uri: string, requestParams?: RequestParams) {
    try {
      const httpResponse = await this.requestBuilder(
        uri,
        'DELETE',
        requestParams,
      );
      return httpResponse.data;
    } catch (err) {
      throw err;
    }
  }
}
