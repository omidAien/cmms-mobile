import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { SystemInformation, SystemInformationCore } from '../appModels';
import { ExtractSystemInfo } from '../SharedClasses/extractSystemInfo';
import { HandleSessionstorage } from '../SharedClasses/HandleSessionStorage';
import { SystemInformationRequestProvider } from '../SharedClasses/prepareSystemInformationRequest';

@Injectable()
export class GetInitialDataService {

  private origin:Required<string> = window.location.origin;
  private appSettingsFilename:string = "../../assets/appSettings.json";
  private baseURL:string;
  private systemInfoApiEndPoint:string = "mapSystemInformation";

  constructor(private httpClient: HttpClient,
              private handleSessionstorage: HandleSessionstorage,
              private extractSystemInfo: ExtractSystemInfo,
              private systemInformationRequestProvider: SystemInformationRequestProvider) {

    this.getInitialDataFromServer();

  }

  readExternalJsonFileFromAssets(filename:string) {

    return this.httpClient.get(filename, {responseType: 'text'});

  }

  pageInfohandler(systemInformation: SystemInformation) {

    const pageInfo: Pick<SystemInformation, "Direction" | "Culture"> = {
      "Direction": systemInformation.Direction,
      "Culture": systemInformation.Culture
    };

    this.handleSessionstorage.set("pageInfo", pageInfo);

  }

  baseURLHandler(appSettingsValue: any) {

    const appSettings = JSON.parse(appSettingsValue);

    if ( this.origin === appSettings.Origin_EXTERNAL ) {
      this.baseURL = appSettings.API_URL_EXTERNAL;
    }
    else {
      this.baseURL = appSettings.API_URL_INTERNAL;
    }

    this.handleSessionstorage.set("baseURL", this.baseURL);

  }

  getInitialDataFromServer() {

    this.readExternalJsonFileFromAssets(this.appSettingsFilename)
        .pipe(
          concatMap((appSettingsValue) => {

            try {

              // 1. save baseUrl in sessionStorage.
              this.baseURLHandler(appSettingsValue);
  
              // 2. send request to get systemInformation from server.
              const systemInfoApiUrl:string = this.baseURL.concat(this.systemInfoApiEndPoint);
              const systemInfoReq$: Observable<SystemInformationCore> = this.systemInformationRequestProvider.get(systemInfoApiUrl);
                    
              return systemInfoReq$;
              
            } catch (error) {
              
              return of(null);

            }
          })
        )
        .subscribe((result: SystemInformationCore | null) => {

          if ( result ) {

            if ( !result.Error.hasError ) {

              // 3. saving systemInformation in sessionStorage.
              const systemInformation: SystemInformation = result.dtSystemInformation[0];
              this.extractSystemInfo.setSystemInfo(systemInformation);

              // 4. managing pageInfo
              this.pageInfohandler(systemInformation);

            }

          }
          else {

            console.log("Error ....");

          }
          
        });
  }

}
