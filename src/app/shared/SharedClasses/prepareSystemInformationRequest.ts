import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";
import { SystemInformationCore } from "../appModels";
import { HandleUnauthorizeError } from "./errorHandlingClass";

@Injectable({
    providedIn: 'root'
})
export class SystemInformationRequestProvider {

    private systemInfoReq$: Observable<SystemInformationCore>;

    constructor(private httpClient: HttpClient, 
                private handleUnauthorizeError: HandleUnauthorizeError ) {}

    get(systemInfoApiUrl: string): Observable<SystemInformationCore> {

        this.systemInfoReq$ = this.httpClient.get<SystemInformationCore>(systemInfoApiUrl)
                                             .pipe(
                                                shareReplay(),
                                                catchError((error: HttpErrorResponse) => {
                                                    this.handleUnauthorizeError.excuteTask(error);
                                                    return throwError(error);
                                                })
                                             );
         
        return this.systemInfoReq$;                                     
    }


}