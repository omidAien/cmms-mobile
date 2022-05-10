import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DMLDataInput, ErrorModel } from '../appModels';
import { GeneralErrorMessage, HandleUnauthorizeError } from '../SharedClasses/errorHandlingClass';
import { ApiEndPointService } from './api-end-point.service';
import { FormFieldErrorService } from './form-field-error.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class DmlOperationService {

  private entryInputs: DMLDataInput;

  constructor(private apiEndPointService: ApiEndPointService,
              private handleUnauthorizeError: HandleUnauthorizeError,
              private loadingService: LoadingService,
              private formFieldErrorService: FormFieldErrorService,
              private generalErrorMessage: GeneralErrorMessage,
              private cookieService: CookieService) { }


  private generateRequestAPI(): Observable<ErrorModel> {

    const token:string = "bearer ".concat(JSON.parse(this.cookieService.get("token")));
    
    return this.apiEndPointService.mapDML(token, this.entryInputs)
                                  .pipe(
                                    catchError((error: HttpErrorResponse) => {
                                      this.handleUnauthorizeError.excuteTask(error);
                                      return throwError(error);
                                    })
                                  );

  }
  
  excute(entryInputs: DMLDataInput) {

    this.entryInputs = entryInputs;
    const barcodeTracker$:Observable<ErrorModel> = this.generateRequestAPI();

    this.loadingService
        .showPreLoaderUntilCompleted(barcodeTracker$, true, 1000)
        .subscribe((response:Required<ErrorModel>) => {

          if ( response.hasError ) {

            this.generalErrorMessage.showMessage(response.Message);

            this.formFieldErrorService.setLogData(response.LogData);

          } 

        });

  }


}
