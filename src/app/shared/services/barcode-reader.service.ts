import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BarcodeTracker, BarcodeTrackerResponse } from '../appModels';
import { GeneralErrorMessage, HandleUnauthorizeError } from '../SharedClasses/errorHandlingClass';
import { ApiEndPointService } from './api-end-point.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class BarcodeReaderService {

  private entryInputs: BarcodeTracker;

  constructor(private apiEndPointService: ApiEndPointService, 
              private handleUnauthorizeError: HandleUnauthorizeError,
              private loadingService: LoadingService,
              private generalErrorMessage: GeneralErrorMessage) {}

  private generateRequestAPI(): Observable<BarcodeTrackerResponse> {

    return this.apiEndPointService.mapTracking(this.entryInputs)
                                  .pipe(
                                    catchError((error: HttpErrorResponse) => {
                                      this.handleUnauthorizeError.excuteTask(error);
                                      return throwError(error);
                                    })
                                  );

  }

  read(entryInputs: BarcodeTracker) {

    this.entryInputs = entryInputs;
    const barcodeTracker$:Observable<BarcodeTrackerResponse> = this.generateRequestAPI();

    this.loadingService
        .showPreLoaderUntilCompleted(barcodeTracker$, true, 1000)
        .subscribe((response:Required<BarcodeTrackerResponse>) => {

          if ( !response.Error.hasError ) {

            console.log(response.Barcode);

          } else {

            this.generalErrorMessage.showMessage(response.Error.Message);

          }

        });

  }


}
