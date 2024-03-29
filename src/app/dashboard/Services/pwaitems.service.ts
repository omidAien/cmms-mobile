import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { EntryInputs, PWAItems, PWAItemsResponse, UserWorkgroup } from 'src/app/shared/appModels';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { GeneralErrorMessage, HandleUnauthorizeError } from 'src/app/shared/SharedClasses/errorHandlingClass';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Injectable({
  providedIn: 'root'
})
export class PWAItemsService {

  private PWAItemsSubject = new BehaviorSubject<PWAItems[]>(null);
  PWAItems$: Observable<PWAItems[]> = this.PWAItemsSubject.asObservable();

  constructor(private handleSessionstorage: HandleSessionstorage,
              private generalErrorMessage: GeneralErrorMessage,
              private apiEndPointService: ApiEndPointService,
              private handleUnauthorizeError: HandleUnauthorizeError,
              private loadingService: LoadingService) { }

  getItems(objectID: number) {

    const userDefaultWorkGroup:UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
    const workgroupID:number = userDefaultWorkGroup.PK_WorkgroupID;

    const entryInputs: EntryInputs = {
      objectID: objectID,
      workgroupID: workgroupID,
      fields: [],
      rowID: 0
    };

    const getPWAItems$: Observable<PWAItemsResponse> = this.apiEndPointService.getPWAItems(entryInputs)
                                                                              .pipe(
                                                                                shareReplay(),
                                                                                catchError((error: HttpErrorResponse) => {
                                                                                  this.handleUnauthorizeError.excuteTask(error);
                                                                                  return throwError(error);
                                                                                })
                                                                              );;

    const subscription = this.loadingService
        .showPreLoaderUntilCompleted(getPWAItems$, true, 500)
        .subscribe((response: PWAItemsResponse) => {

          if ( !response.Error.hasError ) {
  
            this.PWAItemsSubject.next(response.PWA);

          }

          else {

            this.generalErrorMessage.handleServerSideError(response.Error.Message);

          }

          subscription.unsubscribe();

        });

  }

  reset() {

    this.PWAItemsSubject.next(null);

  }

}
