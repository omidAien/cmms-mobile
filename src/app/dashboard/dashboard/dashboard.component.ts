import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntryInputs, PWAItems, PWAItemsResponse, SystemInformation, UserWorkgroup } from 'src/app/shared/appModels';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { GeneralErrorMessage } from 'src/app/shared/SharedClasses/errorHandlingClass';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  userFullname:string = "UnKnown";
  userPosition:string = "UnKnown";

  private PWAItemsSubject = new BehaviorSubject<PWAItems[]>(null);
  PWAItems$: Observable<PWAItems[]> = this.PWAItemsSubject.asObservable();

  constructor(private handleSessionstorage: HandleSessionstorage,
              private apiEndPointService: ApiEndPointService,
              private cookieService: CookieService,
              private loadingService: LoadingService,
              private generalErrorMessage: GeneralErrorMessage) { }

  ngOnInit(): void {

    this.initialInfoHandler();

    this.PWAItemsHandler();

  }

  initialInfoHandler() {

    // 1. getting pageInfo, <Direction" | "Culture>
    this.pageInfo = this.handleSessionstorage.get("pageInfo");

    // 2. getting user Information, <userFullname | userPosition>
    this.userFullname = this.handleSessionstorage.get("userFullName");
    const userDefaultWorkGroup: UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
    this.userPosition = userDefaultWorkGroup.Workgroup;

  }

  PWAItemsHandler() {

    const token:string = "bearer ".concat(JSON.parse(this.cookieService.get("token")));
    const userDefaultWorkGroup:UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
    const workgroupID:number = userDefaultWorkGroup.PK_WorkgroupID;

    const getPWAItems$: Observable<PWAItemsResponse> = this.apiEndPointService.getPWAItems(token, this.entryInputsForPWAItems(workgroupID));

    this.loadingService
        .showPreLoaderUntilCompleted(getPWAItems$, true, 500)
        .subscribe((response: PWAItemsResponse) => {

          if ( !response.Error.hasError ) {
  
            this.PWAItemsSubject.next(response.PWA);

          }

          else {

            this.generalErrorMessage.handleServerSideError(response.Error.Message, this.pageInfo.Direction);

          }

        });

  }

  entryInputsForPWAItems(workgroupID:number): EntryInputs {

    const entryInputs: EntryInputs = {
      objectID: 0,
      workgroupID: workgroupID,
      fields: [],
      rowID: 0
    };

    return entryInputs;

  }

  executeOperationHandler(event: any) {

    const taskTypeAttributeName: string = "taskTypeCode";
    const _target: HTMLElement = event.target;
    let correctTarget: HTMLElement;

    if ( _target.classList.contains("card") ) {

      correctTarget = _target;

    } else if ( _target.closest("section") ) {

      correctTarget = _target.closest("section");

    }

    console.log(correctTarget.id, correctTarget.getAttribute(taskTypeAttributeName));

  }

  ngAfterViewInit(): void {

    // clicking on the home-icon on footer programmatically
    setTimeout(() => {
      document.querySelector('[data-icon-operation="dashboard"]').closest("section").click();
    }, 500);
    
  }

}
