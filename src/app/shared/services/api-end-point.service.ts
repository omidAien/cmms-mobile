import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateParameters, AuthenticateResponse } from '../appModels';

@Injectable({
  providedIn: 'root'
})
export class ApiEndPointService {

  private baseURL:Required<string>;

  constructor(private httpClient: HttpClient) { 

    const baseURLSessionStorage:string = sessionStorage.getItem("baseURL");       
    this.baseURL = baseURLSessionStorage;

  }

  readExternalJsonFileFromAssets(filename:string) {
    return this.httpClient.get(filename, {responseType: 'text'});
  }

  private setHeaders(token:Required<string>) {
    const headres = new HttpHeaders({
      "Authorization" : token,
      "Content-Type" : "application/json; charset=utf-8",
    });
    return headres
  }

  loginProcedure(authenticateParameters:AuthenticateParameters): Observable<AuthenticateResponse> {

    const headers = { 'content-type': 'application/json'}; 
    const requestURL:Required<string> = this.baseURL.concat("Login/athenticate");
    const body:Required<string> = JSON.stringify(authenticateParameters);

    return this.httpClient.post<AuthenticateResponse>(requestURL, body, { headers: headers });
  }

}
