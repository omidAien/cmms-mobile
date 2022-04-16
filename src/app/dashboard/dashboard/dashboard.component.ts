import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntryInputs, PWAItems, PWAItemsResponse, SystemInformation, UserWorkgroup } from 'src/app/shared/appModels';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { BackButtonService } from 'src/app/shared/services/back-button.service';
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
              private backButtonService: BackButtonService,
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

    // 1. constants
    const taskTypeAttributeName: string = "taskTypeCode";
    const captionAttributeName: string = "caption";
    const _target: HTMLElement = event.target;

    // 2. initial variables
    let correctTarget: HTMLElement;
    let extractedObjectID: number = 0;
    let extractedCaption: string;
    let extractedTaskTypeCode: number = 0;
    let extractedRouterPath: string;

    // 3. detecting correctTarget
    if ( _target.classList.contains("card") ) {

      correctTarget = _target;

    } else if ( _target.closest("section") ) {

      correctTarget = _target.closest("section");

    }

    // 4. extracting value for initial variables
    extractedObjectID = +correctTarget.id;
    extractedTaskTypeCode = +correctTarget.getAttribute(taskTypeAttributeName);
    extractedCaption = correctTarget.getAttribute(captionAttributeName);
    extractedRouterPath = location.hash.replace("#", "");

    // 5. manage back-button-stack
    this.backButtonService.push({
      ObjectID: extractedObjectID,
      TaskTypeCode: extractedTaskTypeCode,
      Caption: extractedCaption,
      RouterPath: extractedRouterPath,
      Active: true  
    });

  }

  ngAfterViewInit(): void {

    // clicking on the home-icon on footer programmatically
    setTimeout(() => {
      document.querySelector('[data-icon-operation="dashboard"]').closest("section").click();
    }, 500);
    
  }

}
