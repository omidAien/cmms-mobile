import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AppSettings, SystemInformationCore } from '../appModels';

@Injectable()
export class GetInitialDataService {

  private origin:Required<string> = window.location.origin;
  private appSettingsFilename:string = "../../assets/appSettings.json";
  private baseURL:string;
  private systemInfoApiEndPoint:string = "mapSystemInformation";

  constructor(private httpClient: HttpClient) {

    this.getInitialDataFromServer();

  }

  readExternalJsonFileFromAssets(filename:string) {

    return this.httpClient.get(filename, {responseType: 'text'});

  }

  getInitialDataFromServer() {

    this.readExternalJsonFileFromAssets(this.appSettingsFilename)
        .pipe(
          concatMap((appSettingsValue) => {

            try {

              const appSettings = JSON.parse(appSettingsValue);

              if ( this.origin === appSettings.Origin_EXTERNAL ) {
                this.baseURL = appSettings.API_URL_EXTERNAL;
              }
              else {
                this.baseURL = appSettings.API_URL_INTERNAL;
              }
  
              // 1. save baseUrl in sessionStorage.
              sessionStorage.setItem("baseURL", this.baseURL);
  
              // 2. send request to get systemInformation from server.
              const systemInfoApiUrl:string = this.baseURL.concat(this.systemInfoApiEndPoint);
              const systemInfoReq$: Observable<SystemInformationCore> = this.httpClient.get<SystemInformationCore>(systemInfoApiUrl);
              return systemInfoReq$;
              
            } catch (error) {
              
              return of(null);

            }
          })
        )
        .subscribe((result: SystemInformationCore | null) => {

          if ( result ) {

            if ( !result.Error.hasError ) {

              // 3. save systemInformation in sessionStorage.
              sessionStorage.setItem("systemInformation", JSON.stringify(result.dtSystemInformation[0]));

            }

          }
          else {

            console.log("Error ....");

          }
          
        });
  }

}
