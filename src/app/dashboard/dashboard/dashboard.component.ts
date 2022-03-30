import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { combineLatest, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EntryInputs, PWAItems, PWAItemsResponse, SystemInformation, UserWorkgroup } from 'src/app/shared/appModels';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { GeneralErrorMessage } from 'src/app/shared/SharedClasses/errorHandlingClass';
import { ExtractSystemInfo } from 'src/app/shared/SharedClasses/extractSystemInfo';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';
import { ServerErrorMessageResources } from 'src/assets/Resources/projectResources';

@Component({
  selector: 'map-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  systemInfo: SystemInformation | null = null;
  userFullname:string = "UnKnown";
  userPosition:string = "UnKnown";
  PWAItems: PWAItems[] = [];

  constructor(private handleSessionstorage: HandleSessionstorage,
              private apiEndPointService: ApiEndPointService,
              private cookieService: CookieService,
              private loadingService: LoadingService,
              private generalErrorMessage: GeneralErrorMessage,
              private extractSytemInfo: ExtractSystemInfo) { }

  ngOnInit(): void {

    const token:string = "bearer ".concat(JSON.parse(this.cookieService.get("token")));
    const systemInfo$:Observable<SystemInformation> = this.extractSytemInfo.systemInfo$.pipe(delay(300));
    const getPWAItems$: Observable<PWAItemsResponse> = this.apiEndPointService.getPWAItems(token, this.entryInputsForPWAItems());

    const observableList$ = combineLatest([systemInfo$, getPWAItems$]);
    this.manageDataBound(observableList$);

  }

  manageDataBound(observableList$: Observable<[SystemInformation, PWAItemsResponse]>) {

    this.loadingService
        .showPreLoaderUntilCompleted(observableList$)
        .subscribe(([_systemInfo, _getPWAItems]) => {

          if ( _systemInfo && _getPWAItems ) {

            if ( !_getPWAItems.Error.hasError ) {

              this.systemInfo = _systemInfo;
              this.PWAItems = _getPWAItems.PWA;
  
              this.userFullname = this.handleSessionstorage.get("userFullName");
  
              const userDefaultWorkGroup: UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
              this.userPosition = userDefaultWorkGroup.Workgroup;
  
              this.loadingService.loadingOff();

            }

            else {

              this.generalErrorMessage.handleServerSideError(_getPWAItems.Error.Message, _systemInfo.Direction);
  
            }

          }
          else {

            const errorMessage:string = ServerErrorMessageResources.message;
            this.generalErrorMessage.handleDatabaseSideError(errorMessage);

          }

        });

  }

  entryInputsForPWAItems(): EntryInputs {

    const userDefaultWorkGroup:UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
    const workgroupID:number = userDefaultWorkGroup.PK_WorkgroupID;

    const entryInputs: EntryInputs = {
      objectID: 0,
      workgroupID: workgroupID,
      fields: [],
      rowID: 0
    };

    return entryInputs;

  }

  ngAfterViewInit(): void {

    // clicking on the home-icon on footer programmatically
    setTimeout(() => {
      document.querySelector('[data-icon-operation="dashboard"]').closest("section").click();
    }, 500);
    
  }

}
