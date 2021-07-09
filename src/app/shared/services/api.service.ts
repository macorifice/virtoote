import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private headers: HttpHeaders;
  private apiLocation: string;
  private loginEndpoint: string;
  private forbiddenPath: string;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: any) {
    this.loginEndpoint = 'links/login';
    this.forbiddenPath = '/forbidden/index.html';

    this.apiLocation = 'https://serene-scrubland-19872.herokuapp.com/';

    this.headers = new HttpHeaders();

  }

  /**
   * Common handler for get requests to API
   * @param url
   * @param params (optional)
   * @returns {Promise<any>}
   */
  get(url: string, params?: object): Promise<any> {
    return this.request('get', url, null, params);
  }

  /**
   * Common handler for post requests to API
   * @param url
   * @param body
   * @param params (optional)
   * @returns {Promise<any>}
   */
  post(url: string, body: object, params?: string): Promise<any> {
    return this.request('post', url, body, params);
  }

  /**
   * Common handler for delete requests to API
   * @param url
   * @param params (optional)
   * @returns {Promise<any>}
   */
  delete(url: string, params?: string): Promise<any> {
    return this.request('delete', url, null, params);
  }

  /**
   * Common handler for put requests to API
   * @param url
   * @param body
   * @param params (optional)
   * @returns {Promise<any>}
   */
  put(url: string, body: object, params?: string): Promise<any> {
    return this.request('put', url, body, params);
  }

  async redirectToLogin() {
    const prezEndpoint = this.loginEndpoint;
    console.log('redirectToLogin - redirecting to endpoint: ', prezEndpoint);
    if (prezEndpoint) {
      return this.get(prezEndpoint).then(
        links => {
          console.log('found links for user: ', links);
          const loginPage = links.LOGIN_PAGE ? links.LOGIN_PAGE.reference : links.reference;

          this.document.location = loginPage + '&goto=' + this.document.location;
          return Promise.resolve();
        },
        err => {
          console.error('redirect threw error', err);
          return Promise.reject(err);
        },
      );
    } else {
      console.log('tried to redirect with a null endpoint');
    }
  }

  async redirectToForbidden() {
    const redirectLocation = document.location.origin + this.forbiddenPath + '?type=forbidden';
    console.log('Redirecting to ', redirectLocation);
    this.document.location = redirectLocation;
    return Promise.resolve();
  }

  private request(method, url, body, params): Promise<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    const opts = {
      params: httpParams,
      headers: this.headers,
    };

    let response: Observable<any>;
    if (method === 'put' || method === 'post' || method === 'patch') {
      response = this.http[method](this.apiLocation + url, body, opts);
    } else {
      response = this.http[method](this.apiLocation + url, opts);
    }

    const isSuccess = code => code >= 200 && code < 300;

    return new Promise((resolve, reject) => {
      response.subscribe(
        res => {
          if (res && res.data && isSuccess(res.code)) {
            resolve(res.data);
          } else {
            console.log('Error: API Service - unexpected response format');
            reject(res);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            return this.redirectToLogin();
          } else if (err.status === 403) {
            return this.redirectToForbidden();
          } else if (err.status === 409) {
            resolve({ ...err.error, status: err.status });
          } else {
            console.log('Error: API Service - ' + JSON.stringify(err.error));
            reject(err);
          }
        },
      );
    });
  }
}
