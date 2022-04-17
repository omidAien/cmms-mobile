import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntryInputs, PWAItems, PWAItemsResponse, UserWorkgroup } from 'src/app/shared/appModels';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { GeneralErrorMessage } from 'src/app/shared/SharedClasses/errorHandlingClass';
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
              private cookieService: CookieService,
              private loadingService: LoadingService) { }

  getItems(objectID: number, pagDirection:string) {

    const token:string = "bearer ".concat(JSON.parse(this.cookieService.get("token")));
    const userDefaultWorkGroup:UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
    const workgroupID:number = userDefaultWorkGroup.PK_WorkgroupID;

    const entryInputs: EntryInputs = {
      objectID: objectID,
      workgroupID: workgroupID,
      fields: [],
      rowID: 0
    };

    const getPWAItems$: Observable<PWAItemsResponse> = this.apiEndPointService.getPWAItems(token, entryInputs);

    this.loadingService
        .showPreLoaderUntilCompleted(getPWAItems$, true, 500)
        .subscribe((response: PWAItemsResponse) => {

          if ( !response.Error.hasError ) {
  
            this.PWAItemsSubject.next(response.PWA);

          }

          else {

            this.generalErrorMessage.handleServerSideError(response.Error.Message, pagDirection);

          }

        });

  }

  reset() {

    this.PWAItemsSubject.next(null);

  }

}
