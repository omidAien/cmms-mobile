import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, shareReplay } from 'rxjs/operators';
import { SystemInformation, SystemInformationCore } from '../appModels';
import { HandleUnauthorizeError } from '../SharedClasses/errorHandlingClass';
import { ExtractSystemInfo } from '../SharedClasses/extractSystemInfo';
import { HandleSessionstorage } from '../SharedClasses/HandleSessionStorage';

@Injectable()
export class GetInitialDataService {

  private origin:Required<string> = window.location.origin;
  private appSettingsFilename:string = "../../assets/appSettings.json";
  private baseURL:string;
  private systemInfoApiEndPoint:string = "mapSystemInformation";

  constructor(private httpClient: HttpClient,
              private handleUnauthorizeError: HandleUnauthorizeError, 
              private handleSessionstorage: HandleSessionstorage,
              private extractSystemInfo: ExtractSystemInfo) {

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
              const systemInfoReq$: Observable<SystemInformationCore> = 
                this.httpClient.get<SystemInformationCore>(systemInfoApiUrl)
                    .pipe(
                      shareReplay(),
                      catchError((error: HttpErrorResponse) => {
                        this.handleUnauthorizeError.excuteTask(error);
                        return throwError(error);
                      })
                    );
                    
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
              const systemInformation: SystemInformation = result.dtSystemInformation[0];
              this.extractSystemInfo.setSystemInfo(systemInformation);

              const pageInfo: Pick<SystemInformation, "Direction" | "Culture"> = {
                "Direction": systemInformation.Direction,
                "Culture": systemInformation.Culture
              };

              this.handleSessionstorage.set("pageInfo", pageInfo);

            }

          }
          else {

            console.log("Error ....");

          }
          
        });
  }

}
