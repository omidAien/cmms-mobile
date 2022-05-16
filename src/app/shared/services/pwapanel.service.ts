import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { EntryInputs, OperationButton, PWAPanelResponse, UserWorkgroup } from '../appModels';
import { GeneralErrorMessage, HandleUnauthorizeError } from '../SharedClasses/errorHandlingClass';
import { HandleSessionstorage } from '../SharedClasses/HandleSessionStorage';
import { ApiEndPointService } from './api-end-point.service';
import { BottomSheetOperationsService } from './bottom-sheet-operations.service';
import { FormFieldsService } from './form-fields.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class PWAPanelService {

  private getPWAPanel$: Observable<any>;
  private objectID: number;

  constructor(private handleSessionstorage: HandleSessionstorage,
              private formFieldsService: FormFieldsService,
              private bottomSheetOperationsService: BottomSheetOperationsService,
              private apiEndPointService: ApiEndPointService,
              private cookieService: CookieService,
              private generalErrorMessage: GeneralErrorMessage,
              private handleUnauthorizeError: HandleUnauthorizeError,
              private loadingService: LoadingService) { }

  private prepareRequestData() {

    const token:string = "bearer ".concat(JSON.parse(this.cookieService.get("token")));
    const userDefaultWorkGroup:UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
    const workgroupID:number = userDefaultWorkGroup.PK_WorkgroupID;

    const entryInputs: EntryInputs = {
      objectID: this.objectID,
      workgroupID: workgroupID,
      fields: [],
      rowID: 0
    };

    this.getPWAPanel$ = this.apiEndPointService.getPWAPanel(token, entryInputs)
                                               .pipe(
                                                 shareReplay(),
                                                 catchError((error: HttpErrorResponse) => {
                                                   this.handleUnauthorizeError.excuteTask(error);
                                                   return throwError(error);
                                                 })
                                               );;

  }   

  get(objectID: number) {

    this.objectID = objectID;

    this.prepareRequestData();

    this.loadingService
        .showPreLoaderUntilCompleted(this.getPWAPanel$)
        .subscribe((response: PWAPanelResponse) => {

          if ( !response.Error.hasError ) {

            this.formFieldsService.set(response.TableFields);

            // assesment buttons which will be contained in BottomSheetOperationComponent
            const bottomSheetbButtons: OperationButton[] = response.Toolbar?.filter((btn: OperationButton) => btn.isEnable);
  
            if ( bottomSheetbButtons?.length > 0 ) {
  
              this.bottomSheetOperationsService.set(response.Toolbar);
  
            } else {
  
              this.bottomSheetOperationsService.reset();
  
            }

          } else {

            this.generalErrorMessage.showMessage(response.Error.Message);

          }

        });

  }

}
