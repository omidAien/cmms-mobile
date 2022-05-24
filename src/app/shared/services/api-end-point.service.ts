import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import * as IModels from '../appModels';
import { HandleSessionstorage } from '../SharedClasses/HandleSessionStorage';

@Injectable({
  providedIn: 'root'
})
export class ApiEndPointService {

  private baseURL:Required<string>;

  constructor(private httpClient: HttpClient, 
              private cookieService: CookieService,
              private router: Router,
              private handleSessionstorage: HandleSessionstorage) { 

    const baseURLSessionStorage:string = this.handleSessionstorage.get("baseURL");       
    this.baseURL = baseURLSessionStorage;

  }

  readExternalJsonFileFromAssets(filename:string) {
    return this.httpClient.get(filename, {responseType: 'text'});
  }

  private setHeaders() {

    try {
      
      const token: string = "bearer ".concat(JSON.parse(this.cookieService.get("token")));

      const headres = new HttpHeaders({
        "Authorization" : token,
        "Content-Type" : "application/json; charset=utf-8",
      });
  
      return headres;

    } catch (error) {

      this.handleSessionstorage.reset();

      return;
      
    }

  }

  loginProcedure(authenticateParameters:IModels.AuthenticateParameters): Observable<IModels.AuthenticateResponse> {

    const headers = { 'content-type': 'application/json'}; 
    const requestURL:Required<string> = this.baseURL.concat("Login/athenticate");
    const body:Required<string> = JSON.stringify(authenticateParameters);

    return this.httpClient.post<IModels.AuthenticateResponse>(requestURL, body, { headers: headers });
  }

  getPWAItems(entryInputs: IModels.EntryInputs): Observable<IModels.PWAItemsResponse> {
    
    const requestURL:Required<string> = this.baseURL.concat("mapGetPWAMenu");
    const body:Required<string> = JSON.stringify(entryInputs);

    return this.httpClient.post<IModels.PWAItemsResponse>(requestURL, body, {headers:this.setHeaders()});

  }

  getPWAPanel(entryInputs: IModels.EntryInputs): Observable<IModels.PWAPanelResponse> {
    
    const requestURL:Required<string> = this.baseURL.concat("mapGetPWAPanel");
    const body:Required<string> = JSON.stringify(entryInputs);

    return this.httpClient.post<IModels.PWAPanelResponse>(requestURL, body, {headers:this.setHeaders()});

  }

  mapTracking(barcodeTracker: IModels.BarcodeTracker):Observable<IModels.BarcodeTrackerResponse> {

    const requestURL:Required<string> = this.baseURL.concat("mapTracking");
    const body:Required<string> = JSON.stringify(barcodeTracker);

    return this.httpClient.post<IModels.BarcodeTrackerResponse>(requestURL, body, {headers:this.setHeaders()});

  }

  mapDML(DMLDataInput: IModels.DMLDataInput): Observable<IModels.ErrorModel> {

    const requestURL:Required<string> = this.baseURL.concat("mapDML");
    const body:Required<string> = JSON.stringify(DMLDataInput);

    return this.httpClient.post<IModels.ErrorModel>(requestURL, body, {headers:this.setHeaders()});

  }

}
