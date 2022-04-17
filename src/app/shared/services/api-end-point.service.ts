import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { AuthenticateParameters, AuthenticateResponse, EntryInputs, PWAItemsResponse } from '../appModels';
import { HandleUnauthorizeError } from '../SharedClasses/errorHandlingClass';
import { HandleSessionstorage } from '../SharedClasses/HandleSessionStorage';

@Injectable({
  providedIn: 'root'
})
export class ApiEndPointService {

  private baseURL:Required<string>;

  constructor(private httpClient: HttpClient, 
              private handleSessionstorage: HandleSessionstorage,
              private handleUnauthorizeError: HandleUnauthorizeError) { 

    const baseURLSessionStorage:string = this.handleSessionstorage.get("baseURL");       
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

  getPWAItems(token:string, entryInputs: EntryInputs): Observable<PWAItemsResponse> {
    
    const requestURL:Required<string> = this.baseURL.concat("mapGetPWAItems");
    const body:Required<string> = JSON.stringify(entryInputs);

    return this.httpClient
               .post<PWAItemsResponse>(requestURL, body, {headers:this.setHeaders(token)})
               .pipe(
                 shareReplay(),
                 catchError((error: HttpErrorResponse) => {
                   this.handleUnauthorizeError.excuteTask(error);
                   return throwError(error);
                 })
               );

  }

}
