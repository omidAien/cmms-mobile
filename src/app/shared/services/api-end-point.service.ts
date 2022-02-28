import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}
