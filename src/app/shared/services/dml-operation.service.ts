import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DMLDataInput, ErrorModel } from '../appModels';
import { GeneralErrorMessage, HandleUnauthorizeError } from '../SharedClasses/errorHandlingClass';
import { ApiEndPointService } from './api-end-point.service';
import { FormFieldErrorService } from './form-field-error.service';
import { LoadingService } from './loading.service';
import { PWAPanelService } from './pwapanel.service';

@Injectable({
  providedIn: 'root'
})
export class DmlOperationService {

  private entryInputs: DMLDataInput;

  constructor(private apiEndPointService: ApiEndPointService,
              private handleUnauthorizeError: HandleUnauthorizeError,
              private loadingService: LoadingService,
              private pwaPanelService: PWAPanelService,
              private formFieldErrorService: FormFieldErrorService,
              private generalErrorMessage: GeneralErrorMessage) { }


  private generateRequestAPI(): Observable<ErrorModel> {

    return this.apiEndPointService.mapDML(this.entryInputs)
                                  .pipe(
                                    catchError((error: HttpErrorResponse) => {
                                      this.handleUnauthorizeError.excuteTask(error);
                                      return throwError(error);
                                    })
                                  );

  }
  
  excute(entryInputs: DMLDataInput, updatePWAPanelObjectId: number = 0) {

    this.entryInputs = entryInputs;
    const dmlRequest$:Observable<ErrorModel> = this.generateRequestAPI();

    this.loadingService
        .showPreLoaderUntilCompleted(dmlRequest$, true, 1000)
        .subscribe((response:Required<ErrorModel>) => {

          if ( response.hasError ) {

            this.generalErrorMessage.showMessage(response.Message);

            this.formFieldErrorService.setLogData(response.LogData);

          } else {

            if ( updatePWAPanelObjectId ) {

              this.pwaPanelService.get(updatePWAPanelObjectId);
  
            }

          }

        });

  }


}
