import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type ApiOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public post<TResponse, TBody>(url: string, body?: TBody, options?: ApiOptions): Promise<TResponse> {
    return this.httpClient.post<TResponse>(url, body, options).toPromise();
  }

  public get<TResponse>(url: string, options?: ApiOptions): Promise<TResponse> {
    return this.httpClient.get<TResponse>(url, options).toPromise();
  }

  public delete<TResponse>(url: string, options?: ApiOptions): Promise<TResponse> {
    return this.httpClient.delete<TResponse>(url, options).toPromise();
  }
}
